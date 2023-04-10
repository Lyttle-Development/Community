import { MemberModuleLevel } from '@prisma/client';
import { GuildMember } from '../../../types';

export async function triggerEvent(
  price: number,
  guildMember: GuildMember,
  db_MemberModuleLevel: MemberModuleLevel,
) {
  console.log(price, guildMember, db_MemberModuleLevel);
}
