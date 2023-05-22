import { GuildModuleVoiceGrowthWithChilds } from '../../../../database/handlers';
import client from '../../../../main';
import { VoiceChannel } from 'discord.js';

/**
 * Get the highest position of all child channels.
 * this to set the position of the new channel.
 * @param db_VoiceGrowth
 */
export async function getHighestPosition(
  db_VoiceGrowth: GuildModuleVoiceGrowthWithChilds,
): Promise<number> {
  // Get the highest position of all child channels.
  let highestChannelPosition = 0;

  // Get all child ids form db.
  const childIds = db_VoiceGrowth?.childs.map((x) => x.channel_id.toString());

  // Check if there are any child ids.
  if (childIds.length < 1) return highestChannelPosition;

  // Loop through all child ids.
  for (const childId of childIds) {
    // Get the channel.
    const channel = (await client.channels.cache.get(childId)) as VoiceChannel;

    // Check if channel exists.
    if (channel) {
      // Check if channel position is higher than the current highest position.
      highestChannelPosition =
        channel.position > highestChannelPosition
          ? channel.position
          : highestChannelPosition;
    }
  }

  // Return the highest position.
  return highestChannelPosition;
}
