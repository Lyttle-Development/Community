import { prismaClient } from '../../prisma';
import type { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export function createUser(userId: string): Promise<User> {
  return prismaClient.user.create({
    data: {
      user_id: BigInt(userId),
    },
  });
}

export function findSingleUser(userId: string): Promise<User> {
  return prismaClient.user.findUnique({
    where: {
      user_id: BigInt(userId),
    },
  });
}

export async function getOrCreateUser(userId: string): Promise<User> {
  return (await findSingleUser(userId)) ?? (await createUser(userId));
}

export async function setUserValue(
  userId: string,
  data: Prisma.UserUpdateInput
): Promise<User> {
  await getOrCreateUser(userId);

  return prismaClient.user.update({
    where: {
      user_id: BigInt(userId),
    },
    data,
  });
}

export async function findEveryUser(
  userId: string,
  data: Prisma.UserWhereInput
): Promise<User[]> {
  return prismaClient.user.findMany({
    where: {
      user_id: BigInt(userId),
      ...data,
    },
  });
}
