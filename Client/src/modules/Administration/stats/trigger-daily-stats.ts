import client from '../../../main';
import { log } from '../../../utils';
import { LogType } from '../../../types';
import { getChannels } from './get-channels';
import { getStaff } from './get-staff';
import { getBots } from './get-bots';

export async function triggerDailyStats() {
  const guilds = client.guilds.cache;

  for (const [, guild] of guilds) {
    log(
      LogType.INFO,
      `Triggering daily stats for ${guild.name} (${guild.id})...`,
    );
    await getChannels(guild);
    await getStaff(guild);
    await getBots(guild);
  }
}
