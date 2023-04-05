import { Prisma, UserProfile } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import { getOrCreateUser } from '../User';

export async function createUserProfile(userId: string): Promise<UserProfile> {
  return prismaClient.userProfile.create({
    data: {
      user_id: BigInt(userId),
    },
  });
}

export async function findSingleUserProfile(
  userId: string
): Promise<UserProfile> {
  return prismaClient.userProfile.findUnique({
    where: {
      user_id: BigInt(userId),
    },
  });
}

export async function getOrCreateUserProfile(
  userId: string
): Promise<UserProfile> {
  await getOrCreateUser(userId);
  return (
    (await findSingleUserProfile(userId)) ?? (await createUserProfile(userId))
  );
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  await getOrCreateUser(userId);
  return findSingleUserProfile(userId);
}

export async function setUserProfile(
  userId: string,
  data: Prisma.UserProfileUpdateInput
): Promise<UserProfile> {
  await getOrCreateUserProfile(userId);

  return prismaClient.userProfile.update({
    where: {
      user_id: BigInt(userId),
    },
    data,
  });
}
