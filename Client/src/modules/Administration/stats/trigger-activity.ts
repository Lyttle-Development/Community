import { GuildMember } from '../../../types';
import { incrementGuildStat } from '../../../database/handlers';

export async function triggerActivityStat(guildMember: GuildMember) {
  // Increment the guild stat
  const day = new Date().getDay();
  await incrementGuildStat(guildMember.guildId, 'activity', day, 1, 'activity');
}
