import type { Message } from 'discord.js';
import { GuildMember } from '../../types/app/GuildMember';
import execute from '../actions/onGuildMessageCreate';

async function messageCreate(message: Message): Promise<void> {
  if (message.author.bot) return;

  if (!message.guild) {
    return;
  }

  const serverUser: GuildMember = {
    userId: message.author.id,
    guildId: message.guild.id,
  };

  await execute(message, serverUser);
}

export default messageCreate;
