import { VoiceState } from "discord.js";
import { GuildMember, VoiceEvent } from "../../types";
import { onGuildVoiceStateUpdate } from "../actions";

// Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
async function voiceStateUpdate(
  oldState?: VoiceState,
  newState?: VoiceState
): Promise<void> {
  // Ignore bots
  if (oldState?.member?.user?.bot) return;

  // Ignore if no guild was found.
  if (!oldState?.guild || !newState?.guild) return;

  // Build the guildMember
  const guildMember: GuildMember = {
    guildId: newState?.guild.id ?? oldState?.guild.id,
    userId: newState?.member.id ?? oldState?.member.id,
  };

  if (!guildMember?.guildId || !guildMember?.userId) return;

  // Get the event
  let voiceEvent: VoiceEvent = null;

  // Old channel, new channel
  if (oldState?.channelId && newState?.channelId) {
    // Channel isn't the same
    if (oldState?.channelId !== newState?.channelId) {
      voiceEvent = VoiceEvent.SWITCH;
    }
    // Channel is the same
    if (oldState?.channelId === newState?.channelId) {
      voiceEvent = VoiceEvent.UPDATE;
    }
  }

  // No old channel, new channel
  if (!oldState?.channelId && newState?.channelId) {
    voiceEvent = VoiceEvent.JOIN;
  }

  // Old channel, no new channel
  if (oldState?.channelId && !newState?.channelId) {
    voiceEvent = VoiceEvent.LEAVE;
  }

  // Check if we have an event.
  if (!voiceEvent) return;

  // Fire actions
  await onGuildVoiceStateUpdate(guildMember, oldState, newState, voiceEvent);
}

export default voiceStateUpdate;
