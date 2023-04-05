import { GuildModuleVoiceGrowth, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../guild';
import { delGuildModuleVoiceGrowthChilds } from './VoiceGrowthChild';

export async function createGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowth> {
  return prismaClient.guildModuleVoiceGrowth.create({
    data: {
      guild_id: BigInt(guildId),
      channel_id: BigInt(channelId),
    },
  });
}

export async function findSingleGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowth> {
  return prismaClient.guildModuleVoiceGrowth.findUnique({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
    include: {
      childs: true,
    },
  });
}

export async function getOrCreateGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowth> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleVoiceGrowth(guildId, channelId)) ??
    (await createGuildModuleVoiceGrowth(guildId, channelId))
  );
}

export async function getGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowth> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleVoiceGrowth(guildId, channelId);
}

export async function findAllGuildModuleVoiceGrowth(
  guildId: string
): Promise<GuildModuleVoiceGrowth[]> {
  await getOrCreateGuild(guildId);
  return prismaClient.guildModuleVoiceGrowth.findMany({
    where: {
      guild_id: BigInt(guildId),
    },
    include: {
      childs: true,
    },
  });
}

export async function setGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string,
  data: Prisma.GuildModuleVoiceGrowthUpdateInput
): Promise<GuildModuleVoiceGrowth> {
  await getOrCreateGuildModuleVoiceGrowth(guildId, channelId);

  return prismaClient.guildModuleVoiceGrowth.update({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
    data,
  });
}

export async function delGuildModuleVoiceGrowth(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowth> {
  await delGuildModuleVoiceGrowthChilds(guildId, channelId);

  return prismaClient.guildModuleVoiceGrowth.delete({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
  });
}
