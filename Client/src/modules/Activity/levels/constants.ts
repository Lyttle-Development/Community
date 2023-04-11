import { LevelEventPrices, LevelWeekDay } from '../../../types';

/**
 * Amount of milliseconds in a week.
 * This is used in creation of a level-event.
 */
export const ALMOST_7_DAYS = 600900000;

/**
 * Amount of milliseconds to wait before checking if user spammed.
 * This is used in creation of a level-event.
 */
export const SPAM_PREVENTION_TIME = 3000;

/**
 * Allowed spam amount before cooldown.
 */
export const SPAM_ALLOWED = 2;

/**
 * Amount of milliseconds to wait before checking if user spammed.
 */
export const COOLDOWN_TIME = 30000;

/**
 * Allowed amount of triggers before cooldown end.
 */
export const COOLDOWN_ALLOWED = 3;

/**
 * Price for every event.
 */
export const EVENT_PRICES: LevelEventPrices = {
  default: 0,
  invite: 55,
  command: 35,
  message: 31,
  reaction: 24,
  easterEgg: 80,
  messageEdit: 21,
  voiceUpdate: 29,
  threadCreate: 33,
  eventInterest: 45,
  inCallTime: 1.54321,
};

/**
 * Week days.
 * Based on date object index.
 */
export const WEEK_DAYS: LevelWeekDay[] = [
  LevelWeekDay.sunday,
  LevelWeekDay.monday,
  LevelWeekDay.tuesday,
  LevelWeekDay.wednesday,
  LevelWeekDay.thursday,
  LevelWeekDay.friday,
  LevelWeekDay.saturday,
];
