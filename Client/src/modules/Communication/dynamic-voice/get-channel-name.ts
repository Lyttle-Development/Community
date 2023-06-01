import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ALLOWED_NICKNAME_LENGTH } from '../../../../constants';

/**
 * Get a random channel name
 * @param guildId
 * @param currentNames
 */
export async function getChannelName(
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
    'Communication.dynamic-voice.txt.channel-names',
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
