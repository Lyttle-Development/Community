import { GuildMember as ClientGuildMember } from "../../types/app/GuildMember";
import { GuildMember } from "discord.js";
import { onGuildMemberUpdate } from "../actions";

// Emitted whenever a user subscribes to a guild scheduled event
async function guildMemberUpdate(
  oldMember: GuildMember,
  newMember: GuildMember
): Promise<void> {
  const guildMember: ClientGuildMember = {
    guildId: newMember.guild.id,
    userId: newMember.id,
  };

  if (!guildMember.guildId || !guildMember.userId) return;

  await onGuildMemberUpdate(guildMember, oldMember, newMember);
}

export default guildMemberUpdate;
