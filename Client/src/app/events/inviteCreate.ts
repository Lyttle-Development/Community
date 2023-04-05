import { Invite } from 'discord.js';

import { GuildMember } from '../../types/app/GuildMember';
import { onGuildInviteCreate } from '../actions';

async function inviteCreate(invite: Invite): Promise<void> {
  // Ignore bots
  if (invite?.inviter?.bot) return;

  // Create a guildMember object
  const guildMember: GuildMember = {
    guildId: invite?.guild?.id,
    userId: invite?.inviter?.id,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Fire actions
  await onGuildInviteCreate(guildMember, invite);
}

export default inviteCreate;
