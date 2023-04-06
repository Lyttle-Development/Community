export function getLevelsFromPoints(points: number): number {
  return points === 0 ? 0 : Math.floor(points / 8 / Math.sqrt(points));
}
