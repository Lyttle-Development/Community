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
  const { guildId } = guildMember;

  await checkChannel(guildId, oldState.channelId);
  await checkChannel(guildId, newState.channelId);
}

async function checkChannel(guildId, channelId) {
  if (!channelId) return;

  const db_GuildModuleVoiceGrowthChild =
    await findSingleGuildModuleVoiceGrowthChild(guildId, channelId);

  if (
    db_GuildModuleVoiceGrowthChild &&
    db_GuildModuleVoiceGrowthChild.master_id
  ) {
    channelId = db_GuildModuleVoiceGrowthChild.master_id.toString();
  }

  await triggerDynamicVoiceEvent(guildId, channelId);
}
