import { executor } from '../../utils';
import { actionPrefix } from './index';
import { GuildScheduledEvent, User } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules/Activity/levels/create-event';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildScheduledEventUserAdd.';

// The execute function
export async function onGuildScheduledEventUserAdd(
  guildMember: GuildMember,
  guildScheduledEvent: GuildScheduledEvent,
  user: User,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.eventInterest,
      guildMember,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
