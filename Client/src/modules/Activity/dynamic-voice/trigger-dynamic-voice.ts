import { GuildMember } from '../../../types';
import { ChannelType, VoiceChannel, VoiceState } from 'discord.js';
import {
  createGuildModuleVoiceGrowthChild,
  delGuildModuleVoiceGrowthChild,
  findSingleGuildModuleVoiceGrowth,
  findSingleGuildModuleVoiceGrowthChild,
} from '../../../database/handlers';
import {
  GuildModuleVoiceGrowth,
  GuildModuleVoiceGrowthChild,
} from '@prisma/client';
import client from '../../../main';
import { queue, QueueBacklogType } from '../../../utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ALLOWED_NICKNAME_LENGTH } from '../../../../constants';

/**
 * Trigger all the check to fire a dynamic voice event
 * @param guildMember
 * @param oldState
 * @param newState
 */
export async function triggerDynamicVoice(
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

  // Check if module enabled
  const db_GuildModuleVoiceGrowth = await findSingleGuildModuleVoiceGrowth(
    guildId,
    channelId,
  );

  // If not enabled, return
  if (!db_GuildModuleVoiceGrowth?.enabled) return;
  if (db_GuildModuleVoiceGrowth.manual) return;

  // Trigger the event
  await triggerDynamicVoiceEvent(
    guildId,
    db_GuildModuleVoiceGrowth,
    db_GuildModuleVoiceGrowth.childs,
  );
}

/**
 * Trigger the dynamic voice event
 * @param guildId
 * @param master
 * @param childs
 */
async function triggerDynamicVoiceEvent(
  guildId: string,
  master: GuildModuleVoiceGrowth,
  childs: GuildModuleVoiceGrowthChild[],
) {
  const masterId = master.channel_id.toString();
  const childIds = childs.map((x) => x.channel_id.toString());
  // Get all channel ids, including the master channel
  const channelIds = [masterId, ...childIds];

  const channels = channelIds.map((x) => client.channels.cache.get(x));
  const voiceChannels = channels
    .filter((x) => x.type === ChannelType.GuildVoice)
    .map((x) => x as VoiceChannel);

  const emptyChannels = voiceChannels.filter((x) => x.members.size < 1);

  // If there are too many empty channels, delete all but one
  if (emptyChannels.length > 1) {
    // Get all channels except the first one
    const channelsToDelete = emptyChannels.slice(1);

    // Delete all channels, in the queue.
    channelsToDelete.forEach((x) => {
      // Check if channel is manageable (and not the master channel)
      if (x.manageable && x.id !== masterId) {
        // Queue the deletion
        queue(QueueBacklogType.LOW, async () => {
          // Delete the channel
          await x.delete();
          // Delete the channel from the database
          await delGuildModuleVoiceGrowthChild(guildId, x.id);
        });
      }
    });

    // Stop the function
    return;
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
    });

    // Stop the function
    return;
  }
}

/**
 * Get a random channel name
 * @param guildId
 * @param currentNames
 */
async function getChannelName(
  guildId: string,
  currentNames: string[],
): Promise<string | null> {
  // Get the default message variables
  const defaultVariables = await getMessageVariables({
    guildId,
    userId: guildId,
  });

  // Get the message
  const message = await getMessage(
    guildId,
    'Activity.dynamic-voice.txt.channel-names',
    defaultVariables,
    false,
  );

  // get the names
  const names =
    message
      // Remove all empty lines
      .replaceAll('\n\n', '')
      // Trim the string
      .trim()
      // Split the string into an array
      .split('\n') ||
    // If the array is empty, return an empty array
    [];

  // Filter out the names that are already in use
  const namesFree = names?.filter((x) => !currentNames.includes(x)) || [];
  // If there are no free names, return null
  if (namesFree.length < 1) return null;

  // Get a random name
  const randomIndex = Math.floor(Math.random() * namesFree.length);
  // Get the name
  let name = namesFree[randomIndex] || '';

  // Clean name
  name = name?.trim();
  // If the name is empty, return null
  if (name.length < 1) return null;
  // limit name to max nickname length
  name = name.slice(0, ALLOWED_NICKNAME_LENGTH);

  // Return the name
  return name || null;
}
