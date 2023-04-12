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

/**
 * Number styles.
 * All based on index to number ratio.
 */
export const NUMBER_TYPES: NumberStyles = {
  superscript: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'],
  subscript: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
  caps: ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'],
  serif: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'],
  'round-full': ['⓿', '➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒'],
  'round-empty': ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'],
  landing: ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'],
  lite: ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'],
};

/**
 * Number styles.
 */
export enum NumberStyle {
  'superscript' = 'superscript',
  'subscript' = 'subscript',
  'caps' = 'caps',
  'serif' = 'serif',
  'round-full' = 'round-full',
  'round-empty' = 'round-empty',
  'landing' = 'landing',
  'lite' = 'lite',
}

/**
 * Number styles list of numbers.
 */
export type Numbers = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/**
 * Number styles object: list of numbers.
 */
export type NumberStyles = {
  [key in NumberStyle]: Numbers;
};
