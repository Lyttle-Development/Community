import { Guild } from 'discord.js';

export interface Variables {
  guildId: string;
  guild: Guild;
  prefix: string;
  users: string;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'prefix',
  'users',
];
