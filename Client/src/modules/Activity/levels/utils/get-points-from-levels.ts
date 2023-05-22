import { getLevelingMultiplier } from './get-leveling-multiplier';

/**
 * Get the points from levels
 * @param guildId
 * @param levels
 */
export async function getPointsFromLevels(
  guildId: string,
  levels: number,
): Promise<number> {
  // Get the multiplier
  const multiplier = await getLevelingMultiplier(guildId);

  // Return the points
  return levels === 0 ? 0 : (multiplier * levels) ** 2;
}
