import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { GuildMember } from 'discord.js';
import { GuildMember as ClientGuildMember } from '../../types';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMemberAdd.';

// The execute function
export async function onGuildMemberAdd(
  guildMember: ClientGuildMember,
  member: GuildMember,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'test', test, guildMember, member),
  ];

  // Execute all actions
  await Promise.all(actions);
}
