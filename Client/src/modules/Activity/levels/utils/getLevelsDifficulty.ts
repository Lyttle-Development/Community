import { getPointsFromLevels } from './getPointsFromLevels';
import type { LevelDifficulty } from '../../../../types';

export function getLevelDifficulty(levels: number): LevelDifficulty {
  const xpForOne = getPointsFromLevels(1);
  const currentXp = getPointsFromLevels(levels);

  let times = Math.round((currentXp - xpForOne) / xpForOne);
  const procent = Math.round(((currentXp - xpForOne) / xpForOne) * 100);

  times = times < 1 ? 0 : times;

  return { times, procent };
}
