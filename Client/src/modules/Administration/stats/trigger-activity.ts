import { GuildMember } from '../../../types';
import { incrementGuildStat } from '../../../database/handlers';
import { todayInt } from '../../../utils/queue/check-types/utils/daily';

export async function triggerActivityStat(guildMember: GuildMember) {
  // Increment the guild stat
  await incrementGuildStat(
    guildMember.guildId,
    'activity',
    todayInt,
    1,
    'activity',
  );
}
