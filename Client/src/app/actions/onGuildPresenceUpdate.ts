import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { Presence } from 'discord.js';
import { GuildMember } from '../../types';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildPresenceUpdate.';

// The execute function
export async function onGuildPresenceUpdate(
  guildMember: GuildMember,
  oldPresence: Presence,
  newPresence: Presence,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'test', test, guildMember, oldPresence, newPresence),
  ];

  // Execute all actions
  await Promise.all(actions);
}
