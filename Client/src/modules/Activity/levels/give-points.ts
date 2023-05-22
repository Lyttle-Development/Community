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
import { triggerNickname } from './trigger-nickname';

export let timesPointsGivenSinceLastRestart = 0;
export let totalPointsGivenSinceLastRestart = 0;

/**
 * Give points to a guild member.
 * @param amount
 * @param guildMember
 */
export async function givePoints(amount: number, guildMember: GuildMember) {
  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Round the amount
  const roundedAmount = Math.round(amount);

  // Check if the amount is valid
  if (roundedAmount <= 0) return;

  totalPointsGivenSinceLastRestart += roundedAmount;
  timesPointsGivenSinceLastRestart++;

  // Give points to user
  const {
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  } = await getAndGivePoints(userId, guildId, roundedAmount);

  // Give points to guild
  await getAndGivePoints(guildId, guildId, roundedAmount);

  // Check if the nickname should be updated
  await triggerNickname(
    guildMember,
    null,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  );
  // Check if the points change should trigger an event
  await triggerPointsChange(
    guildMember,
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
  );
}

/**
 * Get the old levels and give points to a guild member.
 * @param userId
 * @param guildId
 * @param amount
 */
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

  // Return state
  return {
    db_MemberModuleLevel_old,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  };
}

/**
 * Set the total weekly value.
 * @param record
 * @param guildId
 * @param userId
 */
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
