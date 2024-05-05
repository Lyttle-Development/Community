export function getTotal(target: number, value: number) {
  // Return a percentage of the value compared to the target
  return Math.round((value / target) * 100);
}
