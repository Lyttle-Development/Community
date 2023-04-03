import { GuildMember } from '../../types/app/GuildMember';
import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';

const prefix: string = actionPrefix + 'onGuildMessageCreate.';

export async function onGuildMessageCreate(
  guildMember: GuildMember,
  message: Message
): Promise<void> {
  console.log(prefix, actionPrefix);
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, message),
  ];

  // Execute all actions
  await Promise.all(actions);
}
