import {executor, test} from '../../utils';
import {actionPrefix} from './index';
import {GuildMember} from 'discord.js';
import {GuildMember as ClientGuildMember} from '../../types/app/GuildMember';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMemberUpdate.';

// The execute function
export async function onGuildMemberUpdate(
  guildMember: ClientGuildMember,
  oldMember: GuildMember,
  newMember: GuildMember
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, oldMember, newMember),
  ];

  // Execute all actions
  await Promise.all(actions);
}
