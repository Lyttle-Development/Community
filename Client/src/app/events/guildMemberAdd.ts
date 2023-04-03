import { GuildMember } from "discord.js";
import { GuildMember as ClientGuildMember } from "../../types/app/GuildMember";
import { onGuildMemberAdd } from "../actions";

// Emitted whenever a user subscribes to a guild scheduled event
async function guildMemberAdd(member: GuildMember): Promise<void> {
  const guildMember: ClientGuildMember = {
    guildId: member?.guild?.id,
    userId: member?.id,
  };

  if (!guildMember?.guildId || !guildMember?.userId) return;

  await onGuildMemberAdd(guildMember, member);
}

export default guildMemberAdd;
