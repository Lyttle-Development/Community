import { GuildMember as ClientGuildMember } from '../../types';
import { GuildMember } from 'discord.js';
import { onGuildMemberUpdate } from '../actions';
import { checkGuildEnabled } from '../../utils';

// Emitted whenever a user subscribes to a guild scheduled event
async function guildMemberUpdate(
  oldMember: GuildMember,
  newMember: GuildMember,
): Promise<void> {
  // Ignore bots
  if (newMember?.user?.bot) return;

  // Create a guildMember object
  const guildMember: ClientGuildMember = {
    guildId: newMember?.guild?.id,
    userId: newMember?.id,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  const guildEnabled = await checkGuildEnabled(guildMember);
  if (!guildEnabled) return;

  // Fire actions
  await onGuildMemberUpdate(guildMember, oldMember, newMember);
}

export default guildMemberUpdate;
