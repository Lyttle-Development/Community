import type { MemberModuleLevelDay, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateMemberModuleLevel } from './level';

export function createMemberModuleLevelDay(
  guildId: string,
  userId: string,
): Promise<MemberModuleLevelDay> {
  return prismaClient.memberModuleLevelDay.upsert({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
    create: {
      guild_id: BigInt(guildId),
      user_id: BigInt(userId),
    },
    update: {
      guild_id: BigInt(guildId),
      user_id: BigInt(userId),
    },
  });
}

export function findSingleMemberModuleLevelDay(
  guildId: string,
  userId: string,
): Promise<MemberModuleLevelDay> {
  return prismaClient.memberModuleLevelDay.findUnique({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
  });
}

export async function getOrCreateMemberModuleLevelDay(
  guildId: string,
  userId: string,
): Promise<MemberModuleLevelDay> {
  await getOrCreateMemberModuleLevel(guildId, userId);

  // Check creation.
  const daily = await findSingleMemberModuleLevelDay(guildId, userId);
  if (!daily) return createMemberModuleLevelDay(guildId, userId);
  return daily;
}

export async function setMemberModuleLevelDayValue(
  guildId: string,
  userId: string,
  data: Prisma.MemberModuleLevelDayUpdateInput,
): Promise<MemberModuleLevelDay> {
  await getOrCreateMemberModuleLevelDay(guildId, userId);

  return prismaClient.memberModuleLevelDay.update({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
    data,
  });
}

export async function resetMemberModuleLevelDayValues(
  guildId: string,
  userId: string,
): Promise<MemberModuleLevelDay> {
  await getOrCreateMemberModuleLevelDay(guildId, userId);

  return prismaClient.memberModuleLevelDay.update({
    where: {
      guild_id_user_id: {
        guild_id: BigInt(guildId),
        user_id: BigInt(userId),
      },
    },
    data: {
      points_monday: 0,
      points_tuesday: 0,
      points_wednesday: 0,
      points_thursday: 0,
      points_friday: 0,
      points_saturday: 0,
      points_sunday: 0,
    },
  });
}

export async function incrementMemberModuleLevelDayValue(
  guildId: string,
  userId: string,
  column: keyof Prisma.MemberModuleLevelDayUpdateInput,
  value: number,
): Promise<MemberModuleLevelDay> {
  await getOrCreateMemberModuleLevelDay(guildId, userId);

  return prismaClient.memberModuleLevelDay.update({
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

export async function get5TopWeeklyMembers(
  guildId: string,
  date: Date,
): Promise<MemberModuleLevelDay[]> {
  return prismaClient.memberModuleLevelDay.findMany({
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
