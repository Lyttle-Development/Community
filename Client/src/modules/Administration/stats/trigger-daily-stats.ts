import client from '../../../main';
import { getChannels } from './get-channels';
import { getStaff } from './get-staff';
import { getBots } from './get-bots';
import { resetCaches } from './reset-caches';
import { Guild } from 'discord.js';

export async function triggerDailyStats() {
  await resetCaches();

  // Get Guilds
  const guilds = client.guilds.cache;

  // Run actions for guilds
  for (const [, guild] of guilds) {
    await triggerDailyStatsForOneGuild(guild);
  }
}

export async function triggerDailyStatsForOneGuild(guild: Guild) {
  await getChannels(guild);
  await getStaff(guild);
  await getBots(guild);
}
