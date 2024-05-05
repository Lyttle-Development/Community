import { Stats } from './get-stats';
import { GuildStatDay, setGuildStat } from '../../database/handlers';
import { BOT_FAKE_GUILD_ID } from '../../../constants';

export async function saveStats(stats: Stats) {
  await setGuildStat(
    BOT_FAKE_GUILD_ID,
    'stats',
    GuildStatDay.Total,
    JSON.stringify(stats),
  );
}
