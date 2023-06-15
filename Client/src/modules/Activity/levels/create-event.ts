import { GuildMember, LevelEvent } from '../../../types';
import { preventSpam } from './prevent-spam';
import { checkCooldown } from './check-cooldown';
import { triggerEvent } from './trigger-event';
import { EVENT_PRICES } from './constants';
import {
  getOrCreateGuildModuleLevel,
  incrementGuildStat,
} from '../../../database/handlers';
import { todayInt } from '../../../utils/queue/check-types/utils/daily';

export let timesEventsCreatedSinceLastRestart = 0;

/**
 * Create an event.
 * - Check if user is spamming.
 * - Check if a cooldown is active.
 * - Trigger the event actions if all positive.
 * @param event
 * @param guildMember
 */
export async function createEvent(event: LevelEvent, guildMember: GuildMember) {
  timesEventsCreatedSinceLastRestart++;
  // Destructure guildMember
  const { guildId } = guildMember;

  // Get guild module level settings.
  const db_GuildModuleLevel = await getOrCreateGuildModuleLevel(guildId);

  // If the levels module is not enabled, stop here.
  if (!db_GuildModuleLevel.enabled) return;

  // Increment the event counter.
  await incrementGuildStat(
    guildId,
    'eventsCreated',
    todayInt,
    1,
    'eventsCreated',
  );

  // Check if user is spamming.
  const { isSpamming, db_MemberModuleLevel } = await preventSpam(guildMember);
  if (isSpamming) return;

  // Check if the user is in cooldown.
  const { inCooldown } = await checkCooldown(guildMember, db_MemberModuleLevel);
  if (inCooldown) return;

  // Increment the event counter.
  await incrementGuildStat(
    guildId,
    'eventsTriggered',
    todayInt,
    1,
    'eventsTriggered',
  );

  // Create the event.
  const price = EVENT_PRICES[event];

  // Trigger the event actions.
  await triggerEvent(price, guildMember);
}
