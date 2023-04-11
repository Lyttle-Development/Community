import { GuildMember } from '../../../types';
import {
  getOrCreateMemberModuleLevelDay,
  resetMemberModuleLevelDayValues,
  setMemberModuleLevelDayValue,
} from '../../../database/handlers';
import { ALMOST_7_DAYS } from '../../../../constants';
import { WEEK_DAYS } from './utils/constants';

export async function checkActivity(guildMember: GuildMember) {
  // Trigger activity for the member.
  const db_MemberModuleLevelDay = await _checkActivity(guildMember);
  // Trigger activity for the guild.
  void _checkActivity({ ...guildMember, userId: guildMember.guildId });

  // Return state.
  return db_MemberModuleLevelDay;
}

async function _checkActivity(guildMember: GuildMember) {
  const { guildId, userId } = guildMember;

  // Get the current activity.
  let db_MemberModuleLevelDay = await getOrCreateMemberModuleLevelDay(
    guildId,
    userId,
  );

  // Create variables
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const lastUpdatedDate = db_MemberModuleLevelDay.updated_at;
  const lastUpdatedTime = db_MemberModuleLevelDay.updated_at.getTime();

  // Get time passed
  const timeBetween = currentTime - lastUpdatedTime;

  // Get time passed
  if (timeBetween > ALMOST_7_DAYS) {
    // reset daily
    db_MemberModuleLevelDay = await resetMemberModuleLevelDayValues(
      guildId,
      userId,
    );
  } else {
    // Get current day & last updated day
    const currentDay = currentDate.getDay();
    const lastUpdatedDay = lastUpdatedDate.getDay();

    // If the day has changed, reset the values.
    if (currentDay !== lastUpdatedDay) {
      // Get days between
      const daysBetween = Math.round(timeBetween / (1000 * 3600 * 24));
      // Create reset values
      const resetValues = {};
      // Reset all days between.
      for (let i = 0; i < daysBetween; i++) {
        // Get current day
        const currentDayNr = currentDay - i < 0 ? currentDay + 7 : currentDay;
        // Get previous day
        const previousDayNr = currentDayNr - i;
        // Get day
        const day = WEEK_DAYS[previousDayNr];
        // Reset day
        resetValues[day] = 0;
      }
      // Reset day
      if (Object.keys(resetValues).length > 0) {
        db_MemberModuleLevelDay = await setMemberModuleLevelDayValue(
          guildId,
          userId,
          resetValues,
        );
      }
    }
  }

  return db_MemberModuleLevelDay;
}
