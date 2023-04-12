import {
  getOrCreateMemberModuleLevel,
  incrementMemberModuleLevelDayValue,
  incrementMemberModuleLevelNumber,
  setMemberModuleLevelDayValue,
} from '../../../database/handlers';
import type { MemberModuleLevel, MemberModuleLevelDay } from '@prisma/client';
import type { LevelWeekDay } from '../../../types';
import { GuildMember } from '../../../types';
import { triggerPointsChange } from './trigger-points-change';
import { WEEK_DAYS } from './constants';
import { giveNickname } from './nickname';

export async function givePoints(amount: number, guildMember: GuildMember) {
  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Round the amount
  const roundedAmount = Math.round(amount);

  // Check if the amount is valid
  if (roundedAmount <= 0) return;

  // Give points to user
  const {
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  } = await getAndGivePoints(userId, guildId, roundedAmount);

  // Give points to guild
  await getAndGivePoints(guildId, guildId, roundedAmount);

  await giveNickname(
    guildMember,
    null,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  );
  await triggerPointsChange(
    guildMember,
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
  );
}

async function getAndGivePoints(
  userId: string,
  guildId: string,
  amount: number,
) {
  // Get old levels
  const db_MemberModuleLevel_old: MemberModuleLevel =
    await getOrCreateMemberModuleLevel(guildId, userId);

  // Give points to user
  const db_MemberModuleLevel: MemberModuleLevel =
    await incrementMemberModuleLevelNumber(guildId, userId, 'points', amount);

  // Get current day
  const day: number = new Date().getDay();
  const dayKey: LevelWeekDay = WEEK_DAYS[day];

  let db_MemberModuleLevelDay: MemberModuleLevelDay =
    await incrementMemberModuleLevelDayValue(guildId, userId, dayKey, amount);

  // Give points to the current day

  // Set the total
  db_MemberModuleLevelDay = await setTotalWeeklyValue(
    db_MemberModuleLevelDay,
    guildId,
    userId,
  );

  return {
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  };
}

async function setTotalWeeklyValue(
  record: MemberModuleLevelDay,
  guildId: string,
  userId: string,
): Promise<MemberModuleLevelDay> {
  // Count the days together
  const total = WEEK_DAYS.reduce((acc, day) => acc + record[day], 0);

  // Set the total
  return await setMemberModuleLevelDayValue(guildId, userId, {
    points: total,
  });
}
