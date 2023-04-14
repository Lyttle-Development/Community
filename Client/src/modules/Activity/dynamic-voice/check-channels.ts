import { GuildMember } from '../../../types';
import { VoiceState } from 'discord.js';
import { findSingleGuildModuleVoiceGrowthChild } from '../../../database/handlers';
import { triggerDynamicVoiceEvent } from './trigger-dynamic-voice-event';

/**
 * Trigger all the check to fire a dynamic voice event
 * @param guildMember
 * @param oldState
 * @param newState
 */
export async function checkDynamicChannels(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
) {
  // Get guild id
  const { guildId } = guildMember;

  // Check both channels
  await checkChannel(guildId, oldState.channelId);

  // If the channel didn't change, break.
  if (oldState.channelId === newState.channelId) return;

  // Check the new channel
  await checkChannel(guildId, newState.channelId);
}

async function checkChannel(guildId, channelId) {
  // If no channel, break.
  if (!channelId) return;

  // Check if the channel is a child channel
  const db_GuildModuleVoiceGrowthChild =
    await findSingleGuildModuleVoiceGrowthChild(guildId, channelId);

  // If it is a child channel, get the master channel
  if (
    db_GuildModuleVoiceGrowthChild &&
    db_GuildModuleVoiceGrowthChild.master_id
  ) {
    // Get the master channel id
    channelId = db_GuildModuleVoiceGrowthChild.master_id.toString();
  }

  // Trigger the event, with the master channel id
  await triggerDynamicVoiceEvent(guildId, channelId);
}
