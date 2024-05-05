import { GuildStat } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export enum GuildStatDay {
  Cache = -2,
  Total = -1,
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

/**
 * Create a guild stat.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 * @param value
 * @param valueInt
 * @param groupKey
 */
export async function createGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
  value: string,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  return prismaClient.guildStat.upsert({
    where: {
      guild_id_key_day: {
        guild_id: BigInt(guildId),
        key,
        day,
      },
    },
    create: {
      guild_id: BigInt(guildId),
      key,
      day,
      group_key: groupKey,
      value,
      value_int: valueInt,
    },
    update: {
      guild_id: BigInt(guildId),
      key,
      day,
      group_key: groupKey,
      value,
      value_int: valueInt,
    },
  });
}

/**
 * Find a single guild stat.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 */
export async function findSingleGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
): Promise<GuildStat> {
  return prismaClient.guildStat.findUnique({
    where: {
      guild_id_key_day: {
        guild_id: BigInt(guildId),
        key,
        day,
      },
    },
  });
}

/**
 * Find all guild stats.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 * @param value
 * @param valueInt
 * @param groupKey
 */
export async function getOrCreateGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
  value: string | null = null,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildStat(guildId, key, day)) ??
    (await createGuildStat(guildId, key, day, value, valueInt, groupKey))
  );
}

/**
 * Get a guild stat.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 */
export async function getGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
): Promise<GuildStat> {
  await getOrCreateGuild(guildId);
  return findSingleGuildStat(guildId, key, day);
}

/**
 * Set a guild stat.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 * @param value
 * @param valueInt
 * @param groupKey
 */
export async function setGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
  value: string | null = null,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  await getOrCreateGuildStat(guildId, key, day, value, valueInt, groupKey);

  return prismaClient.guildStat.update({
    where: {
      guild_id_key_day: {
        guild_id: BigInt(guildId),
        key,
        day,
      },
    },
    data: {
      value,
      value_int: valueInt,
      group_key: groupKey,
    },
  });
}

/**
 * Increment a guild stat.
 * @param guildId
 * @param key
 * @param day
 *  The day to set the stat for.
 *  -2: Cache
 *  -1: Total or non-day specific
 *  0: Monday
 *  1: Tuesday
 *  2: Wednesday
 *  3: Thursday
 *  4: Friday
 *  5: Saturday
 *  6: Sunday
 * @param valueInt
 * @param groupKey
 */
export async function incrementGuildStat(
  guildId: string,
  key: string,
  day: GuildStatDay,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  await getOrCreateGuildStat(guildId, key, day, null, 0, groupKey);
  await getOrCreateGuildStat(guildId, key, -2, null, 0);

  return prismaClient.guildStat.update({
    where: {
      guild_id_key_day: {
        guild_id: BigInt(guildId),
        key,
        day: -2,
      },
    },
    data: {
      value_int: {
        increment: valueInt,
      },
    },
  });
}

/**
 * Get all guild stats caches (where day is -2).
 */
export async function getAllGuildStatsCaches() {
  return prismaClient.guildStat.findMany({
    where: {
      day: -2,
    },
  });
}

/**
 * Get all guild stats. (where day is not cache, aka: day -2)
 * @param guildId
 * @param key
 */
export async function findOneGuildStatsByGuildAndKey(
  guildId: string,
  key: string,
): Promise<GuildStat> {
  return prismaClient.guildStat.findFirst({
    where: {
      guild_id: BigInt(guildId),
      key,
      day: {
        not: -2,
      },
    },
  });
}

/**
 * Remove outdated guild stats.
 */
export function removeOutdatedGuildStats() {
  return prismaClient.guildStat.deleteMany({
    where: {
      updated_at: {
        // Not updated in the last week (7 days)
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      },
    },
  });
}
