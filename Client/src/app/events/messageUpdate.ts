import type { Message } from 'discord.js';
import { GuildMember } from '../../types';
import { onGuildMessageUpdate, onPrivateMessageUpdate } from '../actions';
import { checkGuildEnabled } from '../../utils';

// Emitted whenever a message is updated - e.g. embed or content change.
async function messageUpdate(
  oldMessage: Message,
  newMessage: Message,
): Promise<void> {
  // Ignore bots
  if (oldMessage?.author?.bot) return;

  // If the content is not the same, ignore it
  if (oldMessage?.content === newMessage?.content) return;

  // If the author is not the same, ignore it
  if (oldMessage?.author?.id !== oldMessage?.author?.id) return;
  const userId = oldMessage?.author?.id ?? newMessage?.author?.id;

  // If the message is a DM
  if (!oldMessage?.guild || !newMessage?.guild) {
    if (!userId) return;

    // Fire actions
    await onPrivateMessageUpdate(userId, oldMessage, newMessage);
    return;
  }

  // Build the guildMember
  const guildMember: GuildMember = {
    guildId: newMessage?.guild?.id ?? oldMessage?.guild?.id,
    userId,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  const guildEnabled = await checkGuildEnabled(guildMember);
  if (!guildEnabled) return;

  // Fire actions
  await onGuildMessageUpdate(guildMember, oldMessage, newMessage);
}

export default messageUpdate;
