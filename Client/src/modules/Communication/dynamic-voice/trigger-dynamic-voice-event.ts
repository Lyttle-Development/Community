import { ChannelType, VoiceChannel } from 'discord.js';
import {
  createGuildModuleVoiceGrowthChild,
  delGuildModuleVoiceGrowthChild,
  findSingleGuildModuleVoiceGrowth,
} from '../../../database/handlers';
import client from '../../../main';
import { queue, QueueBacklogType, sleep } from '../../../utils';
import { getChannelName } from './get-channel-name';

export let totalDynamicVoiceChannelCheckedSinceLastRestart = 0;
export let totalDynamicVoiceChannelCreatedSinceLastRestart = 0;
export let totalDynamicVoiceChannelDeletedSinceLastRestart = 0;

// Little channel cache to prevent spamming & multiple checks
export const channelsBeingChecked: { [key: string]: boolean } = {};

export async function triggerDynamicVoiceEvent(
  guildId: string,
  channelId: string,
) {
  // If the channel is already being checked, wait 1 second and try again
  if (channelsBeingChecked[channelId]) {
    // Wait 1 second
    await sleep(1000);
    // Try again
    return triggerDynamicVoiceEvent(guildId, channelId);
  }
  totalDynamicVoiceChannelCheckedSinceLastRestart++;
  // Add the channel to the being checked cache
  channelsBeingChecked[channelId] = true;

  // Trigger the event
  const actionWasNeeded = await fireDynamicVoiceEvent(guildId, channelId);
  // If no action was needed, return (thus everything is as it should be)
  if (!actionWasNeeded) return;
  // An action was needed, so wait 5 seconds and check again.

  // Wait for 5 seconds
  await sleep(5 * 1000);

  // Check again.
  await triggerDynamicVoiceEvent(guildId, channelId);
}

/**
 * Trigger the dynamic voice event
 * @param guildId
 * @param channelId
 */
async function fireDynamicVoiceEvent(
  guildId: string,
  channelId: string,
): Promise<boolean> {
  // Get the database entry for the channel
  const db_GuildModuleVoiceGrowth = await findSingleGuildModuleVoiceGrowth(
    guildId,
    channelId,
  );

  // If not enabled, ot it's a manual channel, stop.
  if (!db_GuildModuleVoiceGrowth?.enabled || db_GuildModuleVoiceGrowth.manual) {
    // Remove the channel from the being checked cache
    delete channelsBeingChecked[channelId];
    // Return as no action was needed
    return false;
  }

  // Get the master channel
  const master = db_GuildModuleVoiceGrowth;
  // Get the child channels
  const childs = db_GuildModuleVoiceGrowth.childs;

  // Get master channel id
  const masterId = master.channel_id.toString();
  // Get all child channel ids
  const childIds = childs.map((x) => x.channel_id.toString());
  // Get all channel ids, including the master channel
  const channelIds = [masterId, ...childIds];

  // Get all channels
  const channels = channelIds.map((x) => client.channels.cache.get(x)) || [];

  // Get all voice channels
  const voiceChannels =
    channels
      .filter((x) => x.type === ChannelType.GuildVoice)
      .map((x) => x as VoiceChannel) || [];

  // Get all empty channels
  const emptyChannels = voiceChannels?.filter((x) => x.members.size < 1) || [];

  // If there are too many empty channels, delete all but one
  if (emptyChannels.length > 1) {
    // Get all channels, except the first one
    const channelsToDelete = emptyChannels.slice(1);

    // Delete all channels, in the queue.
    channelsToDelete.forEach((x) => {
      // Check if channel is manageable (and not the master channel)
      if (x.manageable && x.id !== masterId) {
        // Queue the deletion
        queue(QueueBacklogType.LOW, async () => {
          totalDynamicVoiceChannelDeletedSinceLastRestart++;
          // Delete the channel
          await x.delete();
          // Delete the channel from the database
          await delGuildModuleVoiceGrowthChild(guildId, x.id);
          // Remove the channel from the being checked cache
          delete channelsBeingChecked[masterId];
        });
      } else {
        // Remove the channel from the being checked cache
        delete channelsBeingChecked[masterId];
      }
    });

    // Stop, and return that an action was needed
    return true;
  }

  // If there are no empty channels, create a new one
  if (emptyChannels.length < 1) {
    // Get the names of the current channels
    const currentNames = voiceChannels.map((x) => x.name);

    // Get a new name for the channel
    const name = await getChannelName(guildId, currentNames);

    // Get the last created channel
    const lastChannel = voiceChannels[voiceChannels.length - 1];

    // Queue the creation of a new channel
    queue(QueueBacklogType.LOW, async () => {
      totalDynamicVoiceChannelCreatedSinceLastRestart++;
      // Create the new channel
      const newChannel = name
        ? // If a valid name was found, use it
          await lastChannel.clone({ name })
        : // If no valid name was found, use the default name
          await lastChannel.clone();

      // Get the id and name of the new channel
      const { id: childId, name: childName } = newChannel;

      // Create the new channel in the database
      await createGuildModuleVoiceGrowthChild(
        guildId,
        childId,
        masterId,
        childName,
      );
      // Remove the channel from the being checked cache
      delete channelsBeingChecked[masterId];
    });

    // Stop, and return that an action was needed
    return true;
  }

  // Remove the channel from the being checked cache
  delete channelsBeingChecked[masterId];

  // Return that no action was needed
  return false;
}
