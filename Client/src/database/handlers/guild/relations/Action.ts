import { GuildAction } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateGuild } from '../Guild';

export async function createGuildAction(
  id: number,
  guildId: string,
  key: string,
  values: string,
): Promise<GuildAction> {
  return prismaClient.guildAction.upsert({
    where: {
      id,
    },
    create: {
      guild_id: BigInt(guildId),
      key,
      values,
    },
    update: {
      id,
      guild_id: BigInt(guildId),
      key,
      values,
    },
  });
}

export async function findSingleGuildAction(id: number): Promise<GuildAction> {
  return prismaClient.guildAction.findUnique({
    where: {
      id,
    },
  });
}

export async function findAllGuildActions(): Promise<GuildAction[]> {
  return prismaClient.guildAction.findMany({
    where: {
      executed: false,
    },
  });
}

export async function getOrCreateGuildAction(
  id: number,
  guildId: string,
  key: string,
  values: string,
): Promise<GuildAction> {
  await getOrCreateGuild(guildId);
  return (
    (await findSingleGuildAction(id)) ??
    (await createGuildAction(id, guildId, key, values))
  );
}

export async function getGuildAction(
  id: number,
  guildId: string,
): Promise<GuildAction> {
  await getOrCreateGuild(guildId);
  return findSingleGuildAction(id);
}

export async function setGuildAction(
  id: number,
  guildId: string,
  key: string,
  values: string,
  executed: boolean,
): Promise<GuildAction> {
  await getOrCreateGuildAction(id, guildId, key, values);

  return prismaClient.guildAction.update({
    where: {
      id,
    },
    data: {
      key,
      values,
      executed,
    },
  });
}

export async function setGuildActionAsExecuted(id: number): Promise<void> {
  await prismaClient.guildAction.update({
    where: {
      id,
    },
    data: {
      executed: true,
    },
  });
}

export async function deleteAllExecutedGuildActions() {
  return prismaClient.guildAction.deleteMany({
    where: {
      executed: true,
    },
  });
}
