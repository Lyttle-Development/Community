import {
  Collection,
  Guild,
  GuildMember,
  PermissionsBitField,
} from 'discord.js';
import { setGuildStat } from '../../../database/handlers';

export async function getStaff(guild: Guild): Promise<void> {
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
}
