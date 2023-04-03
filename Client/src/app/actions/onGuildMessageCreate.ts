import {GuildMember} from '../../types/app/GuildMember';
import {executor} from '../../utils';
import {test} from '../../utils/helpers/test';
import {prefix as actionPrefix} from './index';
import {Message} from 'discord.js'; // This file's prefix

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMessageCreate.';

// The execute function
export async function execute(
  event: Message,
  guildMember: GuildMember
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test1', test, 'e', 'b'),
    executor(prefix + 'test2', test, 'e', 'b'),
    executor(prefix + 'test3', test, 'e', 'b'),
  ];

  // Execute all actions
  console.log('info', 'Executing actions...');
  await Promise.all(actions);
  console.log('info', 'Finished executing actions.');
}

export default execute;
