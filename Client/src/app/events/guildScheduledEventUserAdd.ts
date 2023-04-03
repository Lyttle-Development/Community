import {GuildScheduledEvent, User} from 'discord.js';

// Emitted whenever a user subscribes to a guild scheduled event
async function guildScheduledEventUserAdd(
  guildScheduledEvent: GuildScheduledEvent,
  user: User
): Promise<void> {
  // const serverUser: ServerUser = {
  //     guildId: guildScheduledEvent.guild.id,
  //     userId: user.id,
  // };
}

export default guildScheduledEventUserAdd;
