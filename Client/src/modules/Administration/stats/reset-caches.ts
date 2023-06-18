import {
  findOneGuildStatsByGuildAndKey,
  getAllGuildStatsCaches,
  removeOutdatedGuildStats,
  setGuildStat,
} from '../../../database/handlers';

export async function resetCaches() {
  // Get today's day as int
  const todayInt = new Date().getDay();

  // Get all guild stats
  const db_GuildStats = await getAllGuildStatsCaches();

  for (const { guild_id, key, value, value_int } of db_GuildStats) {
    // Prevents resetting the stats if the value is 0
    if (value_int === 0) continue;

    // get the guild id as a string
    const guildId = guild_id.toString();

    // get the group key
    const { group_key } = await findOneGuildStatsByGuildAndKey(guildId, key);

    // set cached result as real result
    await setGuildStat(guildId, key, todayInt, value, value_int, group_key);
    // reset cached result back to 0
    await setGuildStat(guildId, key, -2, null, 0);
  }

  // remove outdated stats (older than 7 days)
  await removeOutdatedGuildStats();
}
