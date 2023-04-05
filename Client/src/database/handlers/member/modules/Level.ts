import { prismaClient } from '../../../prisma';
import { getOrCreateMember } from '../Member';
import type { MemberModuleLevel, Prisma } from '@prisma/client';

// Levels
export function createMemberModuleLevel(
  guildId: string,
  userId: string
): Promise<MemberModuleLevel> {
  return prismaClient.memberModuleLevel.create({
    data: {
      guild_id: BigInt(guildId),
      user_id: BigInt(userId),
    },
  });
}

export function findSingleMemberModuleLevel(
  guildId: string,
  userId: string
): Promise<MemberModuleLevel> {
  return prismaClient.memberModuleLevel.findUnique({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
  });
}

export async function getOrCreateMemberModuleLevel(
  guildId: string,
  userId: string
): Promise<MemberModuleLevel> {
  await getOrCreateMember(guildId, userId);

  // Check creation.
  const level = await findSingleMemberModuleLevel(guildId, userId);
  if (!level) return createMemberModuleLevel(guildId, userId);
  return level;
}

export async function incrementMemberModuleLevelNumber(
  guildId: string,
  userId: string,
  column: keyof Prisma.MemberModuleLevelUpdateInput,
  value: number
): Promise<MemberModuleLevel> {
  await getOrCreateMemberModuleLevel(guildId, userId);

  return prismaClient.memberModuleLevel.update({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
    data: {
      [column]: {
        increment: value,
      },
    },
  });
}

export async function setMemberModuleLevelValue(
  guildId: string,
  userId: string,
  data: Prisma.MemberModuleLevelUpdateInput
): Promise<MemberModuleLevel> {
  await getOrCreateMemberModuleLevel(guildId, userId);

  return prismaClient.memberModuleLevel.update({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
    data,
  });
}

export function getInactiveMemberModuleLevel(
  guildId: string
): Promise<MemberModuleLevel[]> {
  const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return prismaClient.memberModuleLevel.findMany({
    where: {
      guild_id: BigInt(guildId),
      updated_at: {
        lt: last7Days,
      },
    },
  });
}

export async function get5TopMembers(
  guildId: string,
  date: Date
): Promise<MemberModuleLevel[]> {
  return prismaClient.memberModuleLevel.findMany({
    where: {
      guild_id: BigInt(guildId),
      updated_at: {
        gte: date,
      },
    },
    orderBy: {
      points: 'desc',
    },
    take: 22,
  });
}
