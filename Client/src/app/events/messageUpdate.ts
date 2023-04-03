import type {Message} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';
import {onPrivateMessageUpdate} from '../actions';

// Emitted whenever a message is updated - e.g. embed or content change.
async function messageUpdate(
  oldMessage: Message,
  newMessage: Message
): Promise<void> {
  // If the message is from a bot, ignore it
  if (oldMessage.author?.bot) return;

  // If the content is the same, ignore it
  if (oldMessage.content === newMessage.content) return;

  if (oldMessage.author?.id !== oldMessage.author?.id) return;

  if (!oldMessage.guild || !newMessage.guild) {
    if (!oldMessage.author?.id || !newMessage.author?.id) return;

    await onPrivateMessageUpdate(oldMessage.author.id, oldMessage, newMessage);

    return;
  }

  const serverUser: GuildMember = {
    guildId: newMessage.guild?.id ?? oldMessage.guild?.id,
    userId: newMessage.member?.id ?? oldMessage.member?.id,
  };
}

export default messageUpdate;
