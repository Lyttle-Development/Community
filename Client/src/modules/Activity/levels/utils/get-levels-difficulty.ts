import { getPointsFromLevels } from './get-points-from-levels';

/**
 * Get the difficulty of a level
 * @param guildId
 * @param levels
 */
export async function getLevelDifficulty(
  guildId: string,
  levels: number,
): Promise<number> {
  // Get the xp for one level
  const xpForOne = await getPointsFromLevels(guildId, 1);

  // Get the current xp
  const currentXp = await getPointsFromLevels(guildId, levels);

  // Get the times
  let times = Math.round((currentXp - xpForOne) / xpForOne);

  // If the times is below 1, set it to 0
  times = times < 1 ? 0 : times;

  // Return the times
  return times;
}
