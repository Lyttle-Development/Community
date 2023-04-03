import {ThreadChannel} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';

// Emitted whenever a thread is created or when the client user is added to a thread.
async function threadCreate(
  thread: ThreadChannel,
  newlyCreated: boolean
): Promise<void> {
  const serverUser: GuildMember = {
    guildId: thread.guild.id,
    userId: thread.ownerId,
  };
}

export default threadCreate;
