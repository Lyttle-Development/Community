import {GuildMember} from '../../types/app/GuildMember';
import {executor} from '../../utils/executer';
import {test} from '../../utils/helpers/test';

// This file's prefix
const prefix: string = 'onGuildMessageCreate.';

// The execute function
export async function execute(
  event: any,
  guildMember: GuildMember
): Promise<void> {
  // All actions that should be executed
  const actions: Function[] = [
    executor(prefix + 'test', test, 'e', 'b'),
    executor(prefix + 'test', test, 'e', 'b'),
    executor(prefix + 'test', test, 'e', 'b'),
  ];

  // Execute all actions
  await Promise.all(actions);
}

export default execute; 