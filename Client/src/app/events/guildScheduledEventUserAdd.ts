import { GuildScheduledEvent, User } from 'discord.js';
import { GuildMember } from '../../types';
import { onGuildScheduledEventUserAdd } from '../actions';
import { checkGuildEnabled } from '../../utils';

// Emitted whenever a user subscribes to a guild scheduled event
async function guildScheduledEventUserAdd(
  guildScheduledEvent: GuildScheduledEvent,
  user: User,
): Promise<void> {
  // Ignore bots
  if (user?.bot) return;

  // Create a guildMember object
  const guildMember: GuildMember = {
    guildId: guildScheduledEvent?.guild?.id,
    userId: user?.id,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  const guildEnabled = await checkGuildEnabled(guildMember);
  if (!guildEnabled) return;

  // Fire actions
  await onGuildScheduledEventUserAdd(guildMember, guildScheduledEvent, user);
}

export default guildScheduledEventUserAdd;
