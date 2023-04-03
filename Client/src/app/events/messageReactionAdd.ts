import {MessageReaction, User} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';

// Emitted whenever a reaction is added to a cached message.
async function messageReactionAdd(
  messageReaction: MessageReaction,
  user: User
): Promise<void> {
  const serverUser: GuildMember = {
    guildId: messageReaction.message.guild.id,
    userId: user.id,
  };
}

export default messageReactionAdd;
