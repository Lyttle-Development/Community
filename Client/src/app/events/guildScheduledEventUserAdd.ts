import { GuildScheduledEvent, User } from "discord.js";
import { GuildMember } from "../../types";
import { onGuildScheduledEventUserAdd } from "../actions";

// Emitted whenever a user subscribes to a guild scheduled event
async function guildScheduledEventUserAdd(
  guildScheduledEvent: GuildScheduledEvent,
  user: User
): Promise<void> {
  const guildMember: GuildMember = {
    guildId: guildScheduledEvent?.guild?.id,
    userId: user?.id,
  };

  if (!guildMember?.guildId || !guildMember?.userId) return;

  await onGuildScheduledEventUserAdd(guildMember, guildScheduledEvent, user);
}

export default guildScheduledEventUserAdd;
