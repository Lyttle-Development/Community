import client from '../../../main';
import { getChannels } from './get-channels';
import { getStaff } from './get-staff';
import { getBots } from './get-bots';
import { todayIntInitiated } from '../../../utils/queue/check-types/utils/daily';
import { resetCaches } from './reset-caches';

export async function triggerDailyStats() {
  // Wait for bot to startup.
  if (!todayIntInitiated) return setTimeout(triggerDailyStats, 500);

  await resetCaches();

  // Get Guilds
  const guilds = client.guilds.cache;

  // Run actions for guilds
  for (const [, guild] of guilds) {
    await getChannels(guild);
    await getStaff(guild);
    await getBots(guild);
  }
}
