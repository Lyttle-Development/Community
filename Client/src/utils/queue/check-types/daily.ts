import { dailyChecks } from '../checks';
import { queue, QueueBacklogType } from '../queue';
import { currentDay, setLocalStorageDay } from './utils/daily';

/**
 * A function that checks if a new day has started.
 * This especially checks if the time is after 11:00.
 * For a birthday to be triggered!
 */
export function checkNewDay(): void {
  // Set day on first run
  if (!currentDay) setLocalStorageDay();

  // Trigger new day check
  const newDay = setLocalStorageDay();

  // Check against new day
  if (!newDay) return;

  // Trigger new day
  for (const check of dailyChecks) {
    if (!check) continue;
    if (typeof check !== 'function') continue;
    queue(QueueBacklogType.BACKGROUND, check);
  }
}
