import { GuildMember } from '../../types';
import { getOrCreateGuild } from '../../database/handlers';

/**
 * Check if guild is enabled.
 * @param guildMember
 */
export async function checkGuildEnabled(guildMember: GuildMember) {
  // Get the guild from the database.
  const db_Guild = await getOrCreateGuild(guildMember.guildId);

  // Return if the guild is enabled.
  return db_Guild?.enabled ?? false;
}
