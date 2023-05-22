import { GuildMember } from '../../../types';
import {
  getOrCreateMemberModuleLevel,
  incrementMemberModuleLevelNumber,
  setMemberModuleLevelValue,
} from '../../../database/handlers';
import { SPAM_ALLOWED, SPAM_PREVENTION_TIME } from './constants';
import { sleep } from '../../../utils';

/**
 * Prevents spam by checking if the user spammed.
 * @param guildMember
 */
export async function preventSpam(guildMember: GuildMember) {
  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Get current spamCount.
  const { spam_check: check1 } = await incrementMemberModuleLevelNumber(
    guildId,
    userId,
    'spam_check',
    1,
  );

  // Sleep/wait for set timeout.
  await sleep(SPAM_PREVENTION_TIME);

  // Get current spamCount.
  let db_MemberModuleLevel = await getOrCreateMemberModuleLevel(
    guildId,
    userId,
  );

  const check2 = db_MemberModuleLevel.spam_check;

  // Check if user spammed
  if (check1 === check2) {
    db_MemberModuleLevel = await setMemberModuleLevelValue(guildId, userId, {
      spam_check: 0,
    });
  }

  // Return state.
  const isSpamming = check2 > SPAM_ALLOWED;
  return { isSpamming, db_MemberModuleLevel };
}
