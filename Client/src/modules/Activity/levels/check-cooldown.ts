import { GuildMember } from '../../../types';
import { MemberModuleLevel } from '@prisma/client';
import {
  incrementMemberModuleLevelNumber,
  setMemberModuleLevelValue,
} from '../../../database/handlers';
import {
  TOKENS_COOLDOWN_ALLOWED,
  TOKENS_COOLDOWN_TIME,
} from '../../../../constants';

export async function checkCooldown(
  guildMember: GuildMember,
  db_MemberModuleLevel: MemberModuleLevel,
) {
  // Destructure guildMember.
  const { guildId, userId } = guildMember;

  // get the cooldown time.
  const cooldownTime = db_MemberModuleLevel.cooldown_time ?? null;

  // create time between and update it when in cooldown time.
  let timeBetween = 0;
  if (cooldownTime) {
    timeBetween = new Date().getTime() - cooldownTime.getTime();
  }

  // Check if user is in cooldown & check if user is over the cooldown time.
  if (!cooldownTime || timeBetween > TOKENS_COOLDOWN_TIME) {
    // If so reset the time and cooldown count.
    await setMemberModuleLevelValue(guildId, userId, {
      cooldown_time: new Date(),
      cooldown_count: 0,
    });
  }

  // Add cooldown count.
  db_MemberModuleLevel = await incrementMemberModuleLevelNumber(
    guildId,
    userId,
    'cooldown_count',
    1,
  );

  // Create cooldown check.
  const cooldownCount = db_MemberModuleLevel.cooldown_count;
  const inCooldown = cooldownCount > TOKENS_COOLDOWN_ALLOWED;

  // Return state.
  return { inCooldown, db_MemberModuleLevel };
}
