import { executor } from '../../utils';
import { actionPrefix } from './index';
import { GuildMember } from 'discord.js';
import { GuildMember as ClientGuildMember } from '../../types';
import { checkNickname } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMemberUpdate.';

// The execute function
export async function onGuildMemberUpdate(
  guildMember: ClientGuildMember,
  oldMember: GuildMember,
  newMember: GuildMember,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelNickname',
      checkNickname,
      guildMember,
      oldMember,
      newMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
