import { actionPrefix } from './index';
import { GuildMember } from 'discord.js';
import { GuildMember as ClientGuildMember } from '../../types';
import { executor, limit } from '../../utils';
import { triggerActivityStat } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMemberAdd.';

// The execute function
export async function onGuildMemberAdd(
  guildMember: ClientGuildMember,
  member: GuildMember,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
