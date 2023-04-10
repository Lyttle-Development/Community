import { LevelEventPrices } from './src/types';

export const DEV_IDS = ['132487290835435521', '548240698869284884'];

// Time to wait before checking if user spammed.
export const TOKENS_SPAM_PREVENTION_TIME = 3000;

// Allowed end result after spam prevention time.
export const TOKENS_SPAM_ALLOWED = 2;

// Allowed time between cooldowns.
export const TOKENS_COOLDOWN_TIME = 30000;

// Allowed passes before end cooldown time.
export const TOKENS_COOLDOWN_ALLOWED = 3;

export const TOKENS_EVENT_PRICES: LevelEventPrices = {
  default: 0,
  invite: 55,
  message: 31,
  reaction: 24,
  inCallTime: 1.54321,
  voiceUpdate: 29,
  messageEdit: 21,
  easterEgg: 80,
  command: 35,
  threadCreate: 33,
  eventInterest: 45,
};
