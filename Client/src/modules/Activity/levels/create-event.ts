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
  const { isSpamming, db_MemberModuleLevel } = await preventSpam(guildMember);
  if (isSpamming) return;

  // Check if the user is in cooldown.
  const { inCooldown } = await checkCooldown(guildMember, db_MemberModuleLevel);
  if (inCooldown) return;

  // Create the event.
  const price = TOKENS_EVENT_PRICES[event];

  // Trigger the event actions.
  void triggerEvent(price, guildMember);
}
