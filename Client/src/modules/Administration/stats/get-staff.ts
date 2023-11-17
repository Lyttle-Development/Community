import {
  Collection,
  Guild,
  GuildMember,
  PermissionsBitField,
} from 'discord.js';
import { setGuildStat } from '../../../database/handlers';

export const cacheGuilds: string[] = [];

export async function getStaff(guild: Guild): Promise<void> {
  // Check if guild is already cached
  if (cacheGuilds.includes(guild.id)) return;
  // Add guild to cache
  cacheGuilds.push(guild.id);

  const staffMembers: Collection<string, GuildMember> =
    guild.members.cache.filter(
      (member: GuildMember) =>
        member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !member.user.bot,
    );
  const staffMembersIds: string[] = staffMembers.map((member) => member.id);
  const staffMembersCount: number = staffMembers.size;
  await setGuildStat(
    guild.id,
    'staffMembers',
    -1,
    staffMembersCount.toString(),
    staffMembersCount,
  );

  await setGuildStat(
    guild.id,
    'staffMembersIds',
    -1,
    staffMembersIds.toString(),
  );

  // Clear cache after x minutes
  const x = 5;
  setTimeout(
    () => {
      cacheGuilds.splice(cacheGuilds.indexOf(guild.id), 1);
    }, // timeout after x minutes
    1000 * 60 * x,
  );
}
