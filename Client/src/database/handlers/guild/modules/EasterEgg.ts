import { prismaClient } from '../../../prisma';
import type { GuildModuleEasterEgg } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { getOrCreateGuild } from '../Guild';

export async function createGuildModuleEasterEgg(
  guildId: string
): Promise<GuildModuleEasterEgg> {
  return prismaClient.guildModuleEasterEgg.create({
    data: {
      guild_id: BigInt(guildId),
    },
  });
}

export async function findSingleGuildModuleEasterEgg(
  guildId: string
): Promise<GuildModuleEasterEgg> {
  return prismaClient.guildModuleEasterEgg.findUnique({
    where: {
      guild_id: BigInt(guildId),
    },
  });
}

export async function getOrCreateGuildModuleEasterEgg(
  guildId: string
): Promise<GuildModuleEasterEgg> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleEasterEgg(guildId)) ??
    (await createGuildModuleEasterEgg(guildId))
  );
}

export async function getGuildModuleEasterEgg(
  guildId: string
): Promise<GuildModuleEasterEgg> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleEasterEgg(guildId);
}

export async function setGuildModuleEasterEgg(
  guildId: string,
  data: Prisma.GuildModuleEasterEggUpdateInput
): Promise<GuildModuleEasterEgg> {
  await getOrCreateGuildModuleEasterEgg(guildId);

  return prismaClient.guildModuleEasterEgg.update({
    where: {
      guild_id: BigInt(guildId),
    },
    data,
  });
}
