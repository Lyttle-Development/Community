import { getLevelingMultiplier } from './get-leveling-multiplier';

export async function getLevelsFromPoints(
  guildId: string,
  points: number,
): Promise<number> {
  const multiplier = await getLevelingMultiplier(guildId);
  return points <= 0 ? 0 : Math.floor(points / multiplier / Math.sqrt(points));
}
