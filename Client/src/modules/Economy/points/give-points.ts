import {
  getOrCreateMemberModuleLevel,
  incrementMemberModuleLevelDayValue,
  incrementMemberModuleLevelNumber,
  setMemberModuleLevelDayValue,
} from '../../../database/handlers';
import type { MemberModuleLevel, MemberModuleLevelDay } from '@prisma/client';
import { WEEK_DAYS } from './utils/constants';
import type { LevelWeekDay } from '../../../types';
import { GuildMember } from '../../../types';

export async function givePoints(amount: number, guildMember: GuildMember) {
  const { guildId, userId } = guildMember;

  // Give points to user
  const [oldLevels, newLevels, dayLevels] = await getAndGivePoints(
    userId,
    guildId,
    amount,
  );

  // Give points to guild
  await getAndGivePoints(guildId, guildId, amount);

  // Todo: Give nickname
  // Todo: Trigger point change
  // Todo: Trigger leaderboard
}

async function getAndGivePoints(
  userId: string,
  guildId: string,
  amount: number,
): Promise<[MemberModuleLevel, MemberModuleLevel, MemberModuleLevelDay]> {
  // Get old levels
  const oldLevels: MemberModuleLevel = await getOrCreateMemberModuleLevel(
    guildId,
    userId,
  );

  // Give points to user
  const newLevels: MemberModuleLevel = await incrementMemberModuleLevelNumber(
    guildId,
    userId,
    'points',
    amount,
  );

  // Get current day
  const day: number = new Date().getDay();
  const dayKey: LevelWeekDay = WEEK_DAYS[day];

  let levelDay: MemberModuleLevelDay = await incrementMemberModuleLevelDayValue(
    guildId,
    userId,
    dayKey,
    amount,
  );

  // Give points to the current day

  // Set the total
  levelDay = await setTotalWeeklyValue(levelDay, guildId, userId);

  return [oldLevels, newLevels, levelDay];
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
