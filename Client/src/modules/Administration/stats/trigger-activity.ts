import { GuildMember } from '../../../types';
import { incrementGuildStat } from '../../../database/handlers';

export async function triggerActivityStat(guildMember: GuildMember) {
  const todayInt = new Date().getDay();
  // Increment the guild stat
  await incrementGuildStat(
    guildMember.guildId,
    'activity',
    todayInt,
    1,
    'activity',
  );
}
