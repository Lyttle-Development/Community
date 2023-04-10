import { GuildTranslation } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export async function createGuildTranslation(
  guildId: string,
  key: string,
  value: string,
): Promise<GuildTranslation> {
  return prismaClient.guildTranslation.create({
    data: {
      guild_id: BigInt(guildId),
      key,
      value,
    },
  });
}

export async function findSingleGuildTranslation(
  guildId: string,
  key: string,
): Promise<GuildTranslation> {
  return prismaClient.guildTranslation.findUnique({
    where: {
      key_guild_id: {
        guild_id: BigInt(guildId),
        key,
      },
    },
  });
}

export async function getOrCreateGuildTranslation(
  guildId: string,
  key: string,
  value: string,
): Promise<GuildTranslation> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildTranslation(guildId, key)) ??
    (await createGuildTranslation(guildId, key, value))
  );
}

export async function getGuildTranslation(
  guildId: string,
  key: string,
): Promise<GuildTranslation> {
  await getOrCreateGuild(guildId);
  return findSingleGuildTranslation(guildId, key);
}

export async function setGuildTranslation(
  guildId: string,
  key: string,
  value: string,
): Promise<GuildTranslation> {
  await getOrCreateGuildTranslation(guildId, key, value);

  return prismaClient.guildTranslation.update({
    where: {
      key_guild_id: {
        guild_id: BigInt(guildId),
        key,
      },
    },
    data: {
      value,
    },
  });
}
