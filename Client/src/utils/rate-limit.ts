import { GuildMember, LogType } from '../types';
import {
  ALLOWED_RATE_LIMIT_AMOUNT,
  ALLOWED_RATE_LIMIT_TIME,
} from '../../constants';
import { sleep } from './helpers';
import { log } from './log';

export let rateLimitTotalChecks = 0;
export const rateLimitCache: { [key: string]: number } = {};
export const rateLimitLimited: { [key: string]: boolean } = {};

export async function limit(guildMember: GuildMember): Promise<boolean> {
  // Increment the total checks
  rateLimitTotalChecks++;

  // Get the guild id and user id
  const { guildId, userId } = guildMember;
  // Build the id
  const id = guildId + userId;

  // Set the cached cache or initial cache (0)
  rateLimitCache[id] = rateLimitCache[id] || 0;
  // Increment the cache
  rateLimitCache[id] += 1;

  // If the user is not rate limited, wait for the rate limit time
  await sleep(ALLOWED_RATE_LIMIT_TIME);

  // If the user is rate limited, set the limited to true
  let isRateLimited = rateLimitCache[id] > ALLOWED_RATE_LIMIT_AMOUNT;

  // Decrement the cache
  rateLimitCache[id] -= 1;

  // If the user is rate limited, set the limited to true
  if (isRateLimited) {
    rateLimitLimited[id] = true;
    log(LogType.LOG, 'Rate limit hit for:', guildMember.userId); // Todo: Remove on deploy
  }

  // If the user is not spamming, delete the cache
  if (rateLimitCache[id] < 1) {
    delete rateLimitCache[id];
    if (rateLimitLimited[id]) {
      delete rateLimitLimited[id];
    }
  }

  // If the user is spamming, set the rate limit to true
  if (rateLimitLimited[id]) {
    isRateLimited = true;
  }

  // Return if the user is rate limited
  return isRateLimited;
}
