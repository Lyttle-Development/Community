import { getGuildTranslation } from '../database/handlers';
import {
  getModuleMarkdownContent,
  ModuleConfigGlobalVariables,
} from '../../../Content';
import { GuildMember as ClientGuildMember } from '../types';
import { Guild, GuildMember } from 'discord.js';
import client from '../main';

/**
 * Gets a message from the database.
 * - If none was found, it will return the default one.
 * @param guildId
 * @param key
 * @param variables
 * @param prefix
 */
export function getMessage<T>(
  guildId: string,
  key: string,
  variables: T,
  prefix = true,
): Promise<string> {
  // Set the action
  const action = prefix ? getMessagePrefix : getMessageNoPrefix;

  // Return & execute the action
  return action(guildId, key, variables);
}

/**
 * Builds the default messages object.
 * @param guildMember
 */
export async function getMessageVariables(
  guildMember: ClientGuildMember,
): Promise<ModuleConfigGlobalVariables.DefaultVariables> {
  // Get the guild and user
  const { guildId, userId } = guildMember;

  // Get the guild and user
  const guild: Guild = client.guilds.resolve(guildId);
  const user: GuildMember = guild.members.resolve(userId);

  // Get the prefix
  const prefix = await getMessageByKey(guildId, 'Global.prefix');

  return { guild, guildId, user, userId, prefix };
}

/**
 * Gets a message from the database or the default one.
 * @param guildId
 * @param key
 */
async function getMessageByKey(guildId: string, key: string): Promise<string> {
  // Set initial message to null
  let message: null | string = null;

  // Get the message from the database
  const db_GuildTranslation = await getGuildTranslation(guildId, key);
  message = db_GuildTranslation?.value ?? null;

  // If none was found, get the default message
  if (!message) {
    message = getModuleMarkdownContent(key);
  }

  // Return message
  return message ?? '';
}

/**
 * Get the message with prefix, or the default one.
 * @param guildId
 * @param key
 * @param variables
 */
async function getMessagePrefix<T>(
  guildId: string,
  key: string,
  variables: T,
): Promise<string> {
  // Get the messages
  const prefix = await getMessageByKey(guildId, 'Global.prefix');
  let message = await getMessageByKey(guildId, key);

  // Get every row
  let messageRows = message.split('\n');
  // Add prefix to every row
  messageRows = messageRows.map((row, i) =>
    // If it's not the first row, add the prefix
    i !== 0 ? `${prefix}${row}` : row,
  );
  // Join every row
  message = messageRows.join('\n');

  // Convert to Record<string, Primitive>
  const _variables = variables as Record<string, Primitive>;

  // Return message
  return message.render(prefix, _variables);
}

/**
 * Get the message without prefix, or the default one.
 * @param guildId
 * @param key
 * @param variables
 */
async function getMessageNoPrefix<T>(
  guildId: string,
  key: string,
  variables: T,
): Promise<string> {
  // Get the messages
  const message = await getMessageByKey(guildId, key);

  // Convert to Record<string, Primitive>
  const _variables = variables as Record<string, Primitive>;

  // Return message
  return message.insert(_variables);
}
