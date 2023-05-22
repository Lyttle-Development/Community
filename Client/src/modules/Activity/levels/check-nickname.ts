// Check nickname on nickname change.
import { GuildMember as ClientGuildMember } from '../../../types';
import { GuildMember } from 'discord.js';
import { setMemberValue } from '../../../database/handlers';
import { triggerNickname } from './trigger-nickname';

export const nicknamesBeingSet: { [key: string]: string } = {};

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
  await triggerNickname(guildMember, newMember);
}
