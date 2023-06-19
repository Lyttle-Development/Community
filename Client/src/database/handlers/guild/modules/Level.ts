import { GuildModuleLevel, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export async function createGuildModuleLevel(
  guildId: string,
): Promise<GuildModuleLevel> {
  return prismaClient.guildModuleLevel.upsert({
    where: {
      guild_id: BigInt(guildId),
    },
    create: {
      guild_id: BigInt(guildId),
    },
    update: {
      guild_id: BigInt(guildId),
    },
  });
}

export async function findSingleGuildModuleLevel(
  guildId: string,
): Promise<GuildModuleLevel> {
  return prismaClient.guildModuleLevel.findUnique({
    where: {
      guild_id: BigInt(guildId),
    },
  });
}

export async function getOrCreateGuildModuleLevel(
  guildId: string,
): Promise<GuildModuleLevel> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleLevel(guildId)) ??
    (await createGuildModuleLevel(guildId))
  );
}

export async function getGuildModuleLevel(
  guildId: string,
): Promise<GuildModuleLevel> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleLevel(guildId);
}

export async function setGuildModuleLevel(
  guildId: string,
  data: Prisma.GuildModuleLevelUpdateInput,
): Promise<GuildModuleLevel> {
  await getOrCreateGuildModuleLevel(guildId);

  return prismaClient.guildModuleLevel.update({
    where: {
      guild_id: BigInt(guildId),
    },
    data,
  });
}
