import { executor, test } from '../../utils';
import { prefix as actionPrefix } from './index';
import { Guild } from 'discord.js';
import { GuildMember } from '../../types/app/GuildMember';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildCreate.';

// The execute function
export async function onGuildCreate(
  guildMember: GuildMember,
  guild: Guild
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, guild),
  ];

  // Execute all actions
  await Promise.all(actions);
}
