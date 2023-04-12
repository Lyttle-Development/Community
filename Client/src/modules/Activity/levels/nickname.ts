import { GuildMember as ClientGuildMember } from '../../../types';
import { GuildMember } from 'discord.js';
import { getOrCreateGuildModuleLevel } from '../../../database/handlers';

export async function checkNickname(
  guildMember: ClientGuildMember,
  oldMember: GuildMember,
  newMember: GuildMember,
) {
  const { guildId, userId } = guildMember;

  const nicknameChanged = oldMember.nickname !== newMember.nickname;
  const displayNameChanged = oldMember.displayName !== newMember.displayName;
  const usernameChanged = oldMember.user.username !== newMember.user.username;

  const anyNameChanged =
    nicknameChanged || displayNameChanged || usernameChanged;

  // If nothing changed, break.
  if (!anyNameChanged) return;

  // Check if level nicknames are enabled
  const db_GuildModuleLevel = await getOrCreateGuildModuleLevel(guildId);
  if (!db_GuildModuleLevel.enabled || !db_GuildModuleLevel.nicknames) return;

  await giveNickname(guildMember, newMember);
}

async function giveNickname(
  guildMember: ClientGuildMember,
  newMember: GuildMember,
) {
  console.log('changeing nickname');
}
