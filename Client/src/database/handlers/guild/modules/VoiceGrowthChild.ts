// Guild VoiceGrowthChild
import { GuildModuleVoiceGrowthChild, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../guild';

export async function createGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string,
  masterId: string,
  name: string
): Promise<GuildModuleVoiceGrowthChild> {
  return prismaClient.guildModuleVoiceGrowthChild.create({
    data: {
      guild_id: BigInt(guildId),
      channel_id: BigInt(channelId),
      master_id: BigInt(masterId),
      name,
    },
  });
}

export async function findSingleGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowthChild> {
  return prismaClient.guildModuleVoiceGrowthChild.findUnique({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
  });
}

export async function getAllGuildModuleVoiceGrowthChilds(
  guildId: string,
  masterId: string
): Promise<GuildModuleVoiceGrowthChild[]> {
  return prismaClient.guildModuleVoiceGrowthChild.findMany({
    where: {
      guild_id: BigInt(guildId),
      master_id: BigInt(masterId),
    },
  });
}

export async function getOrCreateGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string,
  masterId: string
): Promise<GuildModuleVoiceGrowthChild> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildModuleVoiceGrowthChild(guildId, channelId)) ??
    (await createGuildModuleVoiceGrowthChild(
      guildId,
      channelId,
      masterId,
      'unknown'
    ))
  );
}

export async function getGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowthChild> {
  await getOrCreateGuild(guildId);
  return findSingleGuildModuleVoiceGrowthChild(guildId, channelId);
}

export async function setGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string,
  masterId: string,
  data: Prisma.GuildModuleVoiceGrowthChildUpdateInput
): Promise<GuildModuleVoiceGrowthChild> {
  await getOrCreateGuildModuleVoiceGrowthChild(guildId, channelId, masterId);

  return prismaClient.guildModuleVoiceGrowthChild.update({
    where: {
      guild_id_channel_id: {
        guild_id: BigInt(guildId),
        channel_id: BigInt(channelId),
      },
    },
    data,
  });
}

export async function delGuildModuleVoiceGrowthChild(
  guildId: string,
  channelId: string
): Promise<GuildModuleVoiceGrowthChild> {
  const result = findSingleGuildModuleVoiceGrowthChild(guildId, channelId);
  if (!result) return null;
  return prismaClient.guildModuleVoiceGrowthChild
    .delete({
      where: {
        guild_id_channel_id: {
          guild_id: BigInt(guildId),
          channel_id: BigInt(channelId),
        },
      },
    })
    .catch(() => null);
}

export async function delGuildModuleVoiceGrowthChilds(
  guildId: string,
  masterId: string
): Promise<Prisma.BatchPayload> {
  return prismaClient.guildModuleVoiceGrowthChild.deleteMany({
    where: {
      guild_id: BigInt(guildId),
      master_id: BigInt(masterId),
    },
  });
}
