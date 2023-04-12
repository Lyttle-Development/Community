/**
 * Sleeps for a given amount of time
 * @param ms
 */
export function sleep(ms: number) {
  // Return a promise that resolves after ms milliseconds
  return new Promise((resolve) => setTimeout(resolve, ms));
}
