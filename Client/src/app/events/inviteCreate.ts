import { Invite } from 'discord.js';

import { GuildMember } from '../../types/app/GuildMember';
import { onGuildInviteCreate } from '../actions';

async function inviteCreate(invite: Invite): Promise<void> {
  const guildMember: GuildMember = {
    guildId: invite?.guild?.id,
    userId: invite?.inviter?.id,
  };

  if (!guildMember?.guildId || !guildMember?.userId) return;

  await onGuildInviteCreate(guildMember, invite);
}

export default inviteCreate;
