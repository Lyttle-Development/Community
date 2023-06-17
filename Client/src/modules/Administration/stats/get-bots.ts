import { Collection, Guild, GuildMember } from 'discord.js';
import { setGuildStat } from '../../../database/handlers';

export async function getBots(guild: Guild): Promise<void> {
  const bots: Collection<string, GuildMember> = guild.members.cache.filter(
    (member: GuildMember) => member.user.bot,
  );
  const botsCount: number = bots.size;
  await setGuildStat(guild.id, 'bots', -1, botsCount.toString(), botsCount);
}
