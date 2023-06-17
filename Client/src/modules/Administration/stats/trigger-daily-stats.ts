import client from '../../../main';
import { getChannels } from './get-channels';
import { getStaff } from './get-staff';
import { getBots } from './get-bots';

export async function triggerDailyStats() {
  const guilds = client.guilds.cache;

  for (const [, guild] of guilds) {
    await getChannels(guild);
    await getStaff(guild);
    await getBots(guild);
  }
}
