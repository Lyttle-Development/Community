import { actionPrefix } from './index';
import { Guild } from 'discord.js';
import { GuildMember } from '../../types';
import { executor } from '../../utils';
import { triggerActivityStat } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildCreate.';

// The execute function
export async function onGuildCreate(
  guildMember: GuildMember,
  guild: Guild,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
