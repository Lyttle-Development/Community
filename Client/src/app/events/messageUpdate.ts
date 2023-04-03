import type {Message} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';

// Emitted whenever a message is updated - e.g. embed or content change.
async function messageUpdate(
  oldMessage: Message,
  newMessage: Message
): Promise<void> {
  if (oldMessage.author?.bot) return;
  if (oldMessage.content === newMessage.content) return;
  if (!newMessage.guild?.id ?? !oldMessage.guild?.id) return;
  if (!newMessage.member?.id ?? !oldMessage.member?.id) return;

  const serverUser: GuildMember = {
    guildId: newMessage.guild?.id ?? oldMessage.guild?.id,
    userId: newMessage.member?.id ?? oldMessage.member?.id,
  };
}

export default messageUpdate;
