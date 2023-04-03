import { executor, test } from '../../utils';
import { prefix as actionPrefix } from './index';
import { Invite } from 'discord.js';
import { GuildMember } from '../../types/app/GuildMember';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInviteCreate.';

// The execute function
export async function onGuildInviteCreate(
  guildMember: GuildMember,
  invite: Invite
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, invite),
  ];

  // Execute all actions
  await Promise.all(actions);
}
