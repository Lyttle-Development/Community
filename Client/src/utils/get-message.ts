import { getGuildTranslation } from '../database/handlers/guild/relations/Translation';
import {
  getModuleMarkdownContent,
  ModuleConfigGlobalVariables,
} from '../../../Content';
import { GuildMember as ClientGuildMember } from '../types';
import { Guild, GuildMember } from 'discord.js';
import client from '../main';

export function getMessage<T>(
  guildId: string,
  key: string,
  variables: T,
  prefix = true,
): Promise<string> {
  const action = prefix ? getMessagePrefix : getMessageNoPrefix;
  return action(guildId, key, variables);
}

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

async function getMessagePrefix<T>(
  guildId: string,
  key: string,
  variables: T,
): Promise<string> {
  // Get the messages
  const prefix = await getMessageByKey(guildId, 'Global.prefix');
  const message = await getMessageByKey(guildId, key);

  // Convert to Record<string, Primitive>
  const _variables = variables as Record<string, Primitive>;

  // Return message
  return message.render(prefix, _variables);
}

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
