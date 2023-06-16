import {
  findOneGuildStatsByGuildAndKey,
  getAllGuildStatsCaches,
  setGuildStat,
} from '../../../database/handlers';

export async function resetCaches() {
  const todayInt = new Date().getDay();
  const db_GuildStats = await getAllGuildStatsCaches();

  for (const { guild_id, key, value, value_int } of db_GuildStats) {
    const guildId = guild_id.toString();
    const { group_key } = await findOneGuildStatsByGuildAndKey(guildId, key);
    await setGuildStat(guildId, key, todayInt, value, value_int, group_key);
    await setGuildStat(guildId, key, -2, null, 0);
  }
}
