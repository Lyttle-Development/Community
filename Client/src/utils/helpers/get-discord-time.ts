/**
 * Get the time in seconds for discord
 * @param date
 */
export function getDiscordTime(date): number {
  const time = date.getTime();
  return parseInt((time / 1000).toString(), 10);
}
