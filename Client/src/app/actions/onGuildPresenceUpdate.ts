import { actionPrefix } from './index';
import { Presence } from 'discord.js';
import { GuildMember } from '../../types';
import { limit } from '../../utils';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildPresenceUpdate.';

// The execute function
export async function onGuildPresenceUpdate(
  guildMember: GuildMember,
  oldPresence: Presence,
  newPresence: Presence,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    // executor(prefix + 'test', test, guildMember, oldPresence, newPresence),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
