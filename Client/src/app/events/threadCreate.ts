import { ThreadChannel } from "discord.js";
import { GuildMember } from "../../types/app/GuildMember";
import { onGuildThreadCreate } from "../actions";

// Emitted whenever a thread is created or when the client user is added to a thread.
async function threadCreate(
  thread: ThreadChannel,
  newlyCreated: boolean
): Promise<void> {
  // Build the guildMember
  const guildMember: GuildMember = {
    guildId: thread?.guild?.id,
    userId: thread?.ownerId,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Execute actions
  await onGuildThreadCreate(guildMember, thread, newlyCreated);
}

export default threadCreate;
