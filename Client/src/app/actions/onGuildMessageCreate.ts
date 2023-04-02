import { GuildMember } from '../../types/app/GuildMember';
import { executor } from '../../utils/executer';

export function execute(event: any, guildMember: GuildMember): void {
  const actions = [executor(test, 'test', 'test2')];
}

function test(data, data2) {
  // randomly throw a error
  if (Math.random() > 0.5) {
    throw new Error('Error!');
  }
  return data + data2;
}

export default execute; 