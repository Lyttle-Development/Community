import { queueInternationalDailyCheck, queueNewDayCheck } from '../actions';

export const queueInitialized: (() => void | Promise<void>)[] = [
  queueNewDayCheck,
  queueInternationalDailyCheck,
];
