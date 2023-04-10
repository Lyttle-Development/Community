import { GuildMember, LevelEvent } from '../../../types';
import { preventSpam } from './prevent-spam';
import { checkCooldown } from './check-cooldown';
import { TOKENS_EVENT_PRICES } from '../../../../constants';
import { triggerEvent } from './trigger-event';

/**
 * Create an event.
 * - Check if user is spamming.
 * - Check if a cooldown is active.
 * - Trigger the event actions if all positive.
 * @param event
 * @param guildMember
 */
export async function createEvent(event: LevelEvent, guildMember: GuildMember) {
  // Check if user is spamming.
  const preventSpamResult = await preventSpam(guildMember);
  if (preventSpamResult.isSpamming) return;

  // Create a copy of the db_MemberModuleLevel. (So we use it and update it later)
  let db_MemberModuleLevel = preventSpamResult.db_MemberModuleLevel;

  // Check if the user is in cooldown.
  const checkCooldownResult = await checkCooldown(
    guildMember,
    db_MemberModuleLevel,
  );
  if (checkCooldownResult.inCooldown) return;

  // Update the db_MemberModuleLevel.
  db_MemberModuleLevel = checkCooldownResult.db_MemberModuleLevel;

  // Create the event.
  const price = TOKENS_EVENT_PRICES[event];

  // Trigger the event actions.
  void triggerEvent(price, guildMember, db_MemberModuleLevel);
}
