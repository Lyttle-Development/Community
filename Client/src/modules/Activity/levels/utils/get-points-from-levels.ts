import { getLevelingMultiplier } from './get-leveling-multiplier';

export async function getPointsFromLevels(
  guildId: string,
  levels: number,
): Promise<number> {
  const multiplier = await getLevelingMultiplier(guildId);
  return levels === 0 ? 0 : (multiplier * levels) ** 2;
}
