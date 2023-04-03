import {MessageReaction, User} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';
import {onGuildMessageReactionAdd} from '../actions';

// Emitted whenever a reaction is added to a cached message.
async function messageReactionAdd(
  messageReaction: MessageReaction,
  user: User
): Promise<void> {
  const guildMember: GuildMember = {
    guildId: messageReaction?.message?.guild?.id,
    userId: user?.id,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Fire actions
  await onGuildMessageReactionAdd(guildMember, messageReaction, user);
}

export default messageReactionAdd;
