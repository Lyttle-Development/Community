import { Guild, GuildMember } from 'discord.js';

// export
export interface DefaultVariables {
  guildId: string;
  guild: Guild;
  userId: string;
  user: GuildMember;
  prefix: string;
}
