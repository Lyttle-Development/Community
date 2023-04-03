import { executor, test } from '../../utils';
import { prefix as actionPrefix } from './index';
import { GuildScheduledEvent, User } from 'discord.js';
import { GuildMember } from '../../types/app/GuildMember';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildScheduledEventUserAdd.';

// The execute function
export async function onGuildScheduledEventUserAdd(
  guildMember: GuildMember,
  guildScheduledEvent: GuildScheduledEvent,
  user: User
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, guildScheduledEvent, user),
  ];

  // Execute all actions
  await Promise.all(actions);
}
