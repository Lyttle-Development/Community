export function getTotalEstimate(uptime: number, dailyTarget: number) {
  const daysOnline = uptime / 24;
  return Math.round(daysOnline * dailyTarget);
}
