export function getPointsFromLevels(levels: number): number {
  return levels === 0 ? 0 : 64 * levels ** 2;
}
