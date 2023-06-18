import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { GuildScheduledEvent, User } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent, triggerActivityStat } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildScheduledEventUserAdd.';

// The execute function
export async function onGuildScheduledEventUserAdd(
  guildMember: GuildMember,
  guildScheduledEvent: GuildScheduledEvent,
  user: User,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.eventInterest,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
