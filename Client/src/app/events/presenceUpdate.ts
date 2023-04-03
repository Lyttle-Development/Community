import { Presence } from "discord.js";
import { onGuildPresenceUpdate, onPrivatePresenceUpdate } from "../actions";
import { GuildMember } from "../../types/app/GuildMember";

// Emitted whenever a guild member's presence (e.g. status, activity) is changed.
async function presenceUpdate(
  oldPresence: Presence,
  newPresence: Presence
): Promise<void> {
  // Ignore bots
  if (oldPresence?.user?.bot) return;

  // Ignore if the status is the same
  if (oldPresence?.status === newPresence?.status) return;

  // Ignore if the activity is the same
  if (oldPresence?.activities === newPresence?.activities) return;

  // Ignore if the user isn't the same
  if (!oldPresence?.user || !newPresence?.user) return;
  const userId = oldPresence?.user?.id ?? newPresence?.user?.id;

  if (!oldPresence?.guild || !newPresence?.guild) {
    // Check if we have a valid user
    if (!userId) return;

    // Fire actions
    await onPrivatePresenceUpdate(userId, oldPresence, newPresence);
    return;
  }

  // Build the guildMember
  const guildMember: GuildMember = {
    guildId: newPresence?.guild?.id ?? oldPresence?.guild?.id,
    userId,
  };

  // Check if we have a valid guildMember
  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Fire actions
  await onGuildPresenceUpdate(guildMember, oldPresence, newPresence);
}

export default presenceUpdate;
