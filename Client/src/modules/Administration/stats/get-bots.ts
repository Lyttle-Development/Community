import { Collection, Guild, GuildMember } from 'discord.js';
import { setGuildStat } from '../../../database/handlers';
import { log } from '../../../utils';
import { LogType } from '../../../types';

export async function getBots(guild: Guild): Promise<void> {
  log(
    LogType.INFO,
    `Getting amount of bots for ${guild.name} (${guild.id})...`,
  );
  const bots: Collection<string, GuildMember> = guild.members.cache.filter(
    (member: GuildMember) => member.user.bot,
  );
  const botsCount: number = bots.size;
  await setGuildStat(guild.id, 'bots', -1, botsCount.toString(), botsCount);
}
