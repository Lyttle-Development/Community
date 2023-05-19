import { GuildMember as ClientGuildMember } from '../../../types';
import { Guild, GuildMember } from 'discord.js';
import {
  getOrCreateGuildModuleLevel,
  getOrCreateMember,
  getOrCreateMemberModuleLevel,
  getOrCreateMemberModuleLevelDay,
  setMemberValue,
} from '../../../database/handlers';
import { MemberModuleLevel, MemberModuleLevelDay } from '@prisma/client';
import client from '../../../main';
import { getLevelsFromPoints } from './utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ModuleConfigActivityLevelsTxtNickname } from '../../../../../Content';
import { ALLOWED_NICKNAME_LENGTH } from '../../../../constants';
import { queue, QueueBacklogType, sleep } from '../../../utils';
import { NUMBER_TYPES, Numbers } from './constants';
import { nicknamesBeingSet } from './check-nickname';

// Little fallback cache to prevent spamming the database

/**
 * Triggers the nickname update.
 * @param guildMember
 * @param member
 * @param db_MemberModuleLevel
 * @param db_MemberModuleLevelDay
 */
export async function triggerNickname(
  guildMember: ClientGuildMember,
  member: GuildMember | null = null,
  db_MemberModuleLevel: MemberModuleLevel | null = null,
  db_MemberModuleLevelDay: MemberModuleLevelDay | null = null,
) {
  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Check if level nicknames are enabled
  const db_GuildModuleLevel = await getOrCreateGuildModuleLevel(guildId);
  if (!db_GuildModuleLevel.enabled || !db_GuildModuleLevel.nicknames) return;

  // Get member if none was provided
  if (!member) {
    const guild: Guild = client.guilds.resolve(guildId);
    member = guild.members.resolve(userId);
  }

  // Get member levels if none were provided
  if (!db_MemberModuleLevel) {
    db_MemberModuleLevel = await getOrCreateMemberModuleLevel(guildId, userId);
  }

  // Get member day levels if none were provided
  if (!db_MemberModuleLevelDay) {
    db_MemberModuleLevelDay = await getOrCreateMemberModuleLevelDay(
      guildId,
      userId,
    );
  }

  // Set nickname
  await setNickname(
    guildMember,
    member,
    db_MemberModuleLevel,
    db_MemberModuleLevelDay,
  );
}

/**
 * Set the nickname of a guild member.
 * @param guildMember
 * @param member
 * @param db_MemberModuleLevel
 * @param db_MemberModuleLevelDay
 */
async function setNickname(
  guildMember: ClientGuildMember,
  member: GuildMember,
  db_MemberModuleLevel: MemberModuleLevel,
  db_MemberModuleLevelDay: MemberModuleLevelDay,
) {
  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Get points & levels
  const { points: pointsNr } = db_MemberModuleLevel;
  const levelsNr = await getLevelsFromPoints(guildId, pointsNr);

  // Get points & levels for the week
  const { points: pointsWeekNr } = db_MemberModuleLevelDay;
  const levelsWeekNr = await getLevelsFromPoints(guildId, pointsWeekNr);

  // Get nickname
  const db_Member = await getOrCreateMember(guildId, userId);
  let nickname = db_Member.nickname || null;
  if (!nickname) {
    // set nickname
    nickname = member.nickname || member.displayName || member.user.username;

    // Set nickname in database
    await setMemberValue(guildId, userId, { nickname });
  }

  // Get special numbers
  const recentLevels = await getSpecialNumbers(
    guildId,
    levelsWeekNr,
    'Activity.levels.txt.nickname-numbers.recent-levels',
  );
  const levels = await getSpecialNumbers(
    guildId,
    levelsNr,
    'Activity.levels.txt.nickname-numbers.levels',
  );
  const recentPoints = await getSpecialNumbers(
    guildId,
    pointsWeekNr,
    'Activity.levels.txt.nickname-numbers.recent-points',
  );
  const points = await getSpecialNumbers(
    guildId,
    pointsNr,
    'Activity.levels.txt.nickname-numbers.points',
  );

  // Get message variables
  const defaultVariables = await getMessageVariables(guildMember);
  const messageVars: ModuleConfigActivityLevelsTxtNickname.Variables = {
    ...defaultVariables,
    recentLevels,
    levels,
    recentPoints,
    points,
    name: nickname,
  };
  // Get new nickname
  let newNickname =
    await getMessage<ModuleConfigActivityLevelsTxtNickname.Variables>(
      guildId,
      'Activity.levels.txt.nickname',
      messageVars,
      false,
    );

  // Check if nickname is too long
  let charactersToMuch = newNickname.length - ALLOWED_NICKNAME_LENGTH;

  // If nickname is too long, remove the last characters
  if (charactersToMuch > 0) {
    // Remove the last characters
    nickname = nickname.slice(0, nickname.length - charactersToMuch);
    // Trim nickname
    nickname = nickname.trim();
    // Update message variables
    messageVars.name = nickname;

    // Get new nickname
    newNickname =
      await getMessage<ModuleConfigActivityLevelsTxtNickname.Variables>(
        guildId,
        'Activity.levels.txt.nickname',
        messageVars,
        false,
      );
  }

  // Check if nickname is too long
  charactersToMuch = newNickname.length - ALLOWED_NICKNAME_LENGTH;

  // If nickname is still too long, return
  if (charactersToMuch > 0) return;

  // Check if nickname is already set
  if (newNickname === member.nickname) return;

  // Check if the member is manageable
  if (!member.manageable) return;

  // Trim nickname
  newNickname = newNickname.trim();

  // Check if nickname is already being set
  const id = guildMember.guildId + guildMember.userId;
  if (nicknamesBeingSet[id] === newNickname) return;

  // Set nickname as being set
  nicknamesBeingSet[id] = newNickname;

  // Create the action for the queue
  const action = async () => {
    // Set nickname
    await member.setNickname(newNickname);

    // Wait 5 seconds
    await sleep(5 * 1000);

    // Remove nickname from being set
    delete nicknamesBeingSet[id];
  };

  // Add action to queue
  queue(QueueBacklogType.BACKGROUND, action);
}

/**
 * Get special numbers.
 * @param guildId
 * @param number
 * @param key
 */
async function getSpecialNumbers(guildId, number, key): Promise<string> {
  // get each number
  const numbers = number
    .toString()
    .split('')
    .map((n) => parseInt(n));

  // Get character set's name
  const characterSetName = await getMessage(guildId, key, {}, false);

  // Get character set
  const characterSet: Numbers = NUMBER_TYPES[characterSetName];

  // Check if character set exists, if not, return number
  if (characterSet.length !== 10) return number.toString();

  // Return numbers, replaced with characters
  return numbers.map((n) => characterSet[n]).join('');
}
