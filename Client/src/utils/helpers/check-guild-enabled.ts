import { GuildMember } from '../../types';
import { getOrCreateGuild } from '../../database/handlers';

export async function checkGuildEnabled(guildMember: GuildMember) {
  const db_Guild = await getOrCreateGuild(guildMember.guildId);
  return db_Guild?.enabled ?? false;
}
