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
import { getLevelsFromPoints } from './utils/get-levels-from-points';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ModuleConfigActivityLevelsTxtNickname } from '../../../../../Content';
import { ALLOWED_NICKNAME_LENGTH } from '../../../../constants';
import { sleep } from '../../../utils';

const nicknamesBeingSet: { [key: string]: string } = {};

export async function checkNickname(
  guildMember: ClientGuildMember,
  oldMember: GuildMember,
  newMember: GuildMember,
) {
  const nickname =
    newMember.nickname || newMember.displayName || newMember.user.username;

  // Ignore if it was the bot
  const id = guildMember.guildId + guildMember.userId;
  if (nicknamesBeingSet[id] === nickname) return;

  // Get guild and user id
  const { guildId, userId } = guildMember;

  // Check if level nicknames are enabled
  const nicknameChanged = oldMember.nickname !== newMember.nickname;
  const displayNameChanged = oldMember.displayName !== newMember.displayName;
  const usernameChanged = oldMember.user.username !== newMember.user.username;

  // Check if any name changed
  const anyNameChanged =
    nicknameChanged || displayNameChanged || usernameChanged;

  // If nothing changed, break.
  if (!anyNameChanged) return;

  // Set nickname in database
  await setMemberValue(guildId, userId, { nickname });

  // Give nickname
  await giveNickname(guildMember, newMember);
}

export async function giveNickname(
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

async function setNickname(
  guildMember: ClientGuildMember,
  member: GuildMember,
  db_MemberModuleLevel: MemberModuleLevel,
  db_MemberModuleLevelDay: MemberModuleLevelDay,
) {
  const { guildId, userId } = guildMember;

  // Get points & levels
  const { points } = db_MemberModuleLevel;
  const levels = await getLevelsFromPoints(guildId, points);

  // Get points & levels for the week
  const { points: pointsWeek } = db_MemberModuleLevelDay;
  const levelsWeek = await getLevelsFromPoints(guildId, pointsWeek);

  // Get nickname
  const db_Member = await getOrCreateMember(guildId, userId);
  let nickname = db_Member.nickname || null;
  if (!nickname) {
    // set nickname
    nickname = member.nickname || member.displayName || member.user.username;

    // Set nickname in database
    await setMemberValue(guildId, userId, { nickname });
  }

  // Build nickname
  const defaultVariables = await getMessageVariables(guildMember);
  const messageVars: ModuleConfigActivityLevelsTxtNickname.Variables = {
    ...defaultVariables,
    recentLevels: levelsWeek.toString(),
    levels: levels.toString(),
    recentExp: pointsWeek.toString(),
    exp: points.toString(),
    name: nickname,
  };
  let newNickname =
    await getMessage<ModuleConfigActivityLevelsTxtNickname.Variables>(
      guildId,
      'Activity.levels.txt.nickname',
      messageVars,
      false,
    );

  let charactersToMuch = newNickname.length - ALLOWED_NICKNAME_LENGTH;

  if (charactersToMuch > 0) {
    nickname = nickname.slice(0, nickname.length - charactersToMuch);
    messageVars.name = nickname;

    newNickname =
      await getMessage<ModuleConfigActivityLevelsTxtNickname.Variables>(
        guildId,
        'Activity.levels.txt.nickname',
        messageVars,
        false,
      );
  }
  charactersToMuch = newNickname.length - ALLOWED_NICKNAME_LENGTH;
  if (charactersToMuch > 0) return;

  // Check if nickname is already set
  if (newNickname === member.nickname) return;
  if (!member.manageable) return;

  // Set nickname as being set
  const id = guildMember.guildId + guildMember.userId;
  nicknamesBeingSet[id] = newNickname;

  // Set nickname
  await member.setNickname(newNickname);

  // Wait 10 seconds
  await sleep(10 * 1000);

  // Delete nickname from being set
  delete nicknamesBeingSet[id];
}
