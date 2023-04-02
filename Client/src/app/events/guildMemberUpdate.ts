import {GuildMember} from 'discord.js';

// Emitted whenever a user subscribes to a guild scheduled event
async function guildMemberUpdate(
  oldMember: GuildMember,
  newMember: GuildMember
): Promise<void> {}

export default guildMemberUpdate;
