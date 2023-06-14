import { GuildStat } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export async function createGuildStat(
  guildId: string,
  key: string,
  day: number,
  value: string,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  return prismaClient.guildStat.create({
    data: {
      guild_id: BigInt(guildId),
      key,
      day,
      group_key: groupKey,
      value,
      value_int: valueInt,
    },
  });
}

export async function findSingleGuildStat(
  guildId: string,
  key: string,
  day: number,
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

export async function getOrCreateGuildStat(
  guildId: string,
  key: string,
  day: number,
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

export async function getGuildStat(
  guildId: string,
  key: string,
  day: number,
): Promise<GuildStat> {
  await getOrCreateGuild(guildId);
  return findSingleGuildStat(guildId, key, day);
}

export async function setGuildStat(
  guildId: string,
  key: string,
  day: number,
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

export async function incrementGuildStat(
  guildId: string,
  key: string,
  day: number,
  valueInt = 0,
  groupKey: string | null = null,
): Promise<GuildStat> {
  const db_GuildStat = await getOrCreateGuildStat(
    guildId,
    key,
    day,
    null,
    valueInt,
    groupKey,
  );
  const db_GuildStat__Cache = await getOrCreateGuildStat(
    guildId,
    key,
    -2,
    null,
    valueInt,
  );

  // If the stat wasn't updated in the last 24 hours, reset it back to 0.
  if (db_GuildStat.updated_at.getTime() < Date.now() - 86400000) {
    const value =
      db_GuildStat__Cache.updated_at.getTime() > Date.now() - 86400000
        ? db_GuildStat__Cache.value_int
        : 0;
    await setGuildStat(guildId, key, day, null, value, groupKey);
    await setGuildStat(guildId, key, -2, null, 0);
  }

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
