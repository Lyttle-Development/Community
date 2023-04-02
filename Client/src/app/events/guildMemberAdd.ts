import {GuildMember} from 'discord.js';

// Emitted whenever a user subscribes to a guild scheduled event
async function guildMemberAdd(member: GuildMember): Promise<void> {}

export default guildMemberAdd;
