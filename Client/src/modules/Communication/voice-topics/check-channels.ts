import { GuildMember } from '../../../types';
import { VoiceBasedChannel, VoiceState } from 'discord.js';
import {
  delGuildModuleVoiceGrowthChild,
  findAllGuildModuleVoiceGrowth,
  GuildModuleVoiceGrowthWithChilds,
} from '../../../database/handlers';
import { queue, QueueBacklogType } from '../../../utils';
import { updateTotalVoiceTopicsDeletedSinceLastRestart } from './create-voice-topic-child';

/**
 * Check if a voice topic channel needs to be deleted.
 * @param guildMember
 * @param oldState
 * @param newState
 */
export async function checkVoiceTopicChannels(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
) {
  // Get guild id.
  const { guildId } = guildMember;

  // Stop if the channel did not change.
  if (oldState.channelId === newState.channelId) return;

  // Get all master channels.
  const allMasterChannels = await findAllGuildModuleVoiceGrowth(guildId);

  // Stop if there are no master channels.
  if (allMasterChannels.length < 1) return;

  // Loop through all master channels.
  for (const x of allMasterChannels) {
    // If this is not a manual channel, skip it.
    if (!x.manual) continue;
    // Handle voice growth.
    await checkMasterChilds(x, oldState);
  }
}

/**
 * Checks all childs of a master channel.
 * @param masterChannel
 * @param oldState
 */
async function checkMasterChilds(
  masterChannel: GuildModuleVoiceGrowthWithChilds,
  oldState: VoiceState,
): Promise<void> {
  // Define ids (now empty).
  const ids = [];

  // If there are childs, add them to the ids array.
  if (masterChannel?.childs?.length > 0) {
    // Add all child ids to the ids array.
    ids.push(...masterChannel.childs.map((x) => x.channel_id.toString()));
  }

  // Check if the oldState channel id is in the ids array.
  if (ids.includes(oldState.channelId)) {
    return checkChannelState(masterChannel, oldState);
  }
}

/**
 * Checks if a channel needs to be deleted.
 * And thus queues the deletion.
 * @param masterChannel
 * @param oldState
 */
async function checkChannelState(
  masterChannel: GuildModuleVoiceGrowthWithChilds,
  oldState: VoiceState,
): Promise<void> {
  // Check if channel is empty now.
  if (oldState.channel?.members.size > 0) return;

  // Check if this channel is the master channel.
  if (oldState.channelId === masterChannel.channel_id.toString()) return;

  // Delete the channel.
  await deleteChild(masterChannel.guild_id.toString(), oldState.channel);
}

/**
 * Deletes a channel, when available.
 * @param guildId
 * @param channel
 */
async function deleteChild(
  guildId: string,
  channel: VoiceBasedChannel,
): Promise<string> {
  // Check if channel still exists.
  if (!channel) return;

  // Build queue action
  const deleteAction = async () => {
    // Check if channel still exists.
    if (!channel) return;
    // Get channel id
    const { id: channelId } = channel;
    // Delete channel
    await channel.delete();
    // Delete channel from database
    await delGuildModuleVoiceGrowthChild(guildId, channelId);
    updateTotalVoiceTopicsDeletedSinceLastRestart();
  };

  // Queue action
  queue(QueueBacklogType.URGENT, deleteAction);
}
