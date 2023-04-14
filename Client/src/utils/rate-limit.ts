import { GuildMember } from '../types';
import {
  ALLOWED_RATE_LIMIT_AMOUNT,
  ALLOWED_RATE_LIMIT_TIME,
} from '../../constants';
import { sleep } from './helpers';

const cache: { [key: string]: number } = {};
const limited: { [key: string]: boolean } = {};

export async function limit(guildMember: GuildMember): Promise<boolean> {
  // Get the guild id and user id
  const { guildId, userId } = guildMember;
  // Build the id
  const id = guildId + userId;

  // Set the cached cache or initial cache (0)
  cache[id] = cache[id] || 0;
  // Increment the cache
  cache[id] += 1;

  // If the user is not rate limited, wait for the rate limit time
  await sleep(ALLOWED_RATE_LIMIT_TIME);

  // If the user is rate limited, set the limited to true
  let isRateLimited = cache[id] > ALLOWED_RATE_LIMIT_AMOUNT;

  // Decrement the cache
  cache[id] -= 1;

  // If the user is rate limited, set the limited to true
  if (isRateLimited) {
    limited[id] = true;
    console.log('Rate limit hit for:', guildMember.userId);
  }

  // If the user is not spamming, delete the cache
  if (cache[id] < 1) {
    delete cache[id];
    if (limited[id]) {
      delete limited[id];
    }
  }

  // If the user is spamming, set the rate limit to true
  if (limited[id]) {
    isRateLimited = true;
  }

  // Return if the user is rate limited
  return isRateLimited;
}
