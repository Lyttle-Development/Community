import { dailyChecks } from '../checks';
import { queue, QueueBacklogType } from '../queue';

let currentDay: string | null = null;

const setLocalStorageDay = (): boolean => {
  // Get date
  const today = new Date();
  // copy last value
  const lastDay = currentDay?.slice() ?? '';

  // If a new day happend (after 11:00)
  if (today.getHours() >= 11) {
    // Set current day
    currentDay = today.toLocaleDateString();
  } else {
    // Set current day to yesterday
    if (today.getHours() >= 0) today.setDate(today.getDate() - 1);
    // Set current day
    currentDay = today.toLocaleDateString();
  }

  // Check if last day is not equal to current day
  return lastDay !== currentDay;
};

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
    queue(QueueBacklogType.BACKGROUND, check);
  }
}
