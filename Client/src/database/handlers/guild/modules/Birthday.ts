import { GuildModuleBirthday, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export async function createGuildModuleBirthday(
  guildId: string,
): Promise<GuildModuleBirthday> {
  return prismaClient.guildModuleBirthday.upsert({
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

export async function findSingleGuildModuleBirthday(
  guildId: string,
): Promise<GuildModuleBirthday> {
  return prismaClient.guildModuleBirthday.findUnique({
    where: {
      guild_id: BigInt(guildId),
    },
  });
}

export async function getOrCreateGuildModuleBirthday(
  guildId: string,
): Promise<GuildModuleBirthday> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleBirthday(guildId)) ??
    (await createGuildModuleBirthday(guildId))
  );
}

export async function getGuildModuleBirthday(
  guildId: string,
): Promise<GuildModuleBirthday> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleBirthday(guildId);
}

export async function setGuildModuleBirthday(
  guildId: string,
  data: Prisma.GuildModuleBirthdayUpdateInput,
): Promise<GuildModuleBirthday> {
  await getOrCreateGuildModuleBirthday(guildId);

  return prismaClient.guildModuleBirthday.update({
    where: {
      guild_id: BigInt(guildId),
    },
    data,
  });
}
