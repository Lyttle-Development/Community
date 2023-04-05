import { prismaClient } from '../../../prisma';
import type { GuildModuleCountToNumber } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { getOrCreateGuild } from '../guild';

export async function createGuildModuleCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  return prismaClient.guildModuleCountToNumber.create({
    data: {
      guild_id: BigInt(guildId),
      channel_id: BigInt(channelId),
    },
  });
}

export async function findSingleGuildModuleCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  return prismaClient.guildModuleCountToNumber.findUnique({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
  });
}

export async function getOrCreateGuildModuleCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleCountToNumber(guildId, channelId)) ??
    (await createGuildModuleCountToNumber(guildId, channelId))
  );
}

export async function getGuildModuleCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleCountToNumber(guildId, channelId);
}

export async function setGuildModuleCountToNumber(
  guildId: string,
  channelId: string,
  data: Prisma.GuildModuleCountToNumberUpdateInput
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuildModuleCountToNumber(guildId, channelId);

  return prismaClient.guildModuleCountToNumber.update({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
    data,
  });
}

export async function incrementGuildModuleCountToNumberNumber(
  guildId: string,
  channelId: string,
  column: keyof Prisma.GuildModuleCountToNumberUpdateInput,
  value: number
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuildModuleCountToNumber(guildId, channelId);

  return prismaClient.guildModuleCountToNumber.update({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
    data: {
      [column]: {
        increment: value,
      },
    },
  });
}
