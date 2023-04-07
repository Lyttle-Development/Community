import { getPointsFromLevels } from './get-points-from-levels';
import type { LevelDifficulty } from '../../../../types';

export async function getLevelDifficulty(
  guildId: string,
  levels: number,
): Promise<LevelDifficulty> {
  const xpForOne = await getPointsFromLevels(guildId, 1);
  const currentXp = await getPointsFromLevels(guildId, levels);

  let times = Math.round((currentXp - xpForOne) / xpForOne);
  const procent = Math.round(((currentXp - xpForOne) / xpForOne) * 100);

  times = times < 1 ? 0 : times;

  return { times, procent };
}
