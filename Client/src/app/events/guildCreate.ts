import { Guild } from "discord.js";
import { onGuildCreate } from "../actions";
import { GuildMember } from "../../types/app/GuildMember";

// Emitted whenever a guild is created
async function guildCreate(guild: Guild): Promise<void> {
  // Create a guildMember object
  const guildMember: GuildMember = {
    guildId: guild?.id,
    userId: guild?.ownerId,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Fire actions
  await onGuildCreate(guildMember, guild);
}

export default guildCreate;
