import { GuildModuleVoiceGrowthWithChilds } from '../../../../database/handlers';

/**
 * Cleans a topic & adds the prefix.
 * @param masterChannel
 * @param topic
 */
export async function cleanChannelName(
  masterChannel: GuildModuleVoiceGrowthWithChilds,
  topic: string,
): Promise<string> {
  // Check if topic is valid.
  if (topic.length < 1) return 'Unknown';

  // Clean the topic.
  let name = topic
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

  // Check if name is valid.
  if (name.length < 1) return 'Unknown';

  // Add the prefix to the name.
  if (masterChannel.prefix && masterChannel.prefix.length > 0) {
    name = masterChannel.prefix + name;
  }

  // Check if name is valid.
  if (name.length > 100) return name.slice(0, 100);

  // Return the name.
  return name;
}
