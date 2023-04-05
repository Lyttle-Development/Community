import { prismaClient } from '../../../prisma';
import type { GuildModuleCountToNumber } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { getOrCreateGuild } from '../guild';

// Guild Fun
export async function createGuildCountToNumber(
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

export async function findSingleGuildCountToNumber(
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

export async function getOrCreateGuildCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildCountToNumber(guildId, channelId)) ??
    (await createGuildCountToNumber(guildId, channelId))
  );
}

export async function getGuildCountToNumber(
  guildId: string,
  channelId: string
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuild(guildId);
  return findSingleGuildCountToNumber(guildId, channelId);
}

export async function setGuildCountToNumber(
  guildId: string,
  channelId: string,
  data: Prisma.GuildModuleCountToNumberUpdateInput
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuildCountToNumber(guildId, channelId);

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

export async function incrementCountToNumberNumber(
  guildId: string,
  channelId: string,
  column: keyof Prisma.GuildModuleCountToNumberUpdateInput,
  value: number
): Promise<GuildModuleCountToNumber> {
  await getOrCreateGuildCountToNumber(guildId, channelId);

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
