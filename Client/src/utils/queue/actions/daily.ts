import { queue, queueAt, QueueBacklogType } from '../';
import { dailyChecks } from '../checks/daily';
import { internationalDailyChecks } from '../checks/international-daily';

type Action = () => void | Promise<void>;

export function queueInternationalDailyCheck(): void {
  createQueueAtDate(11, 0, internationalDailyChecks);
}

export function queueNewDayCheck(): void {
  createQueueAtDate(0, 0, dailyChecks);
}

function createQueueAtDate(
  hours: number,
  minutes: number,
  actions: Action[],
): void {
  // Check if we have actions.
  if (actions.length < 1) return;

  // Get date objects
  const todayDate = new Date();
  const nextDayDate = new Date();

  // Set to 11:00
  nextDayDate.setHours(hours, minutes, 0, 0);

  // Check if the next day is today
  if (nextDayDate.getTime() <= todayDate.getTime() + 1000) {
    // Add a day
    nextDayDate.setDate(nextDayDate.getDate() + 1);
  }

  // Queue the check
  const queueAction = () => {
    // Loop through all actions
    for (const action of actions) {
      // Queue the action
      queue(QueueBacklogType.BACKGROUND, action);
    }

    // Check if we have a return action
    createQueueAtDate(hours, minutes, actions);
  };

  // Queue the action
  queueAt(nextDayDate, queueAction);
}
