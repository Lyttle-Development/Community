import { ThreadChannel } from 'discord.js';
import { GuildMember } from '../../types';
import { onGuildThreadCreate } from '../actions';
import { checkGuildEnabled } from '../../utils';

// Emitted whenever a thread is created or when the client user is added to a thread.
async function threadCreate(
  thread: ThreadChannel,
  newlyCreated: boolean,
): Promise<void> {
  // Build the guildMember
  const guildMember: GuildMember = {
    guildId: thread?.guild?.id,
    userId: thread?.ownerId,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  const guildEnabled = await checkGuildEnabled(guildMember);
  if (!guildEnabled) return;

  // Execute actions
  await onGuildThreadCreate(guildMember, thread, newlyCreated);
}

export default threadCreate;
