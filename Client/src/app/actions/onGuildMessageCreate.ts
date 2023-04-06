import { GuildMember } from '../../types';
import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';
import { getPointsFromLevels } from '../../modules/Activity/levels/utils/get-points-from-levels';
import { getLevelsFromPoints } from '../../modules/Activity/levels/utils/get-levels-from-points';

const prefix: string = actionPrefix + 'onGuildMessageCreate.';

export async function onGuildMessageCreate(
  guildMember: GuildMember,
  message: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, message),
    executor(prefix + 'test', async () => {
      const points = 100;
      const guildId = message.guild.id;

      console.log('Doing it!');

      const levels = await getLevelsFromPoints(guildId, points);
      console.log(levels);

      const pointsFromLevels = await getPointsFromLevels(guildId, levels);
      console.log(pointsFromLevels);

      console.log('Finished it!');
    }),
  ];

  // Execute all actions
  await Promise.all(actions);
}
