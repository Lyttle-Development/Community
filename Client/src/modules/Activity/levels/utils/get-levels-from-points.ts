import { getLevelingMultiplier } from './get-leveling-multiplier';

/**
 * Get the levels from points
 * @param guildId
 * @param points
 */
export async function getLevelsFromPoints(
  guildId: string,
  points: number,
): Promise<number> {
  // Get the multiplier
  const multiplier = await getLevelingMultiplier(guildId);

  // Return the levels
  return points <= 0 ? 0 : Math.floor(points / multiplier / Math.sqrt(points));
}
