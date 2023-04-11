import { executor } from '../../utils';
import { actionPrefix } from './index';
import { ThreadChannel } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules/Activity/levels/create-event';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildThreadCreate.';

// The execute function
export async function onGuildThreadCreate(
  guildMember: GuildMember,
  thread: ThreadChannel,
  newlyCreated: boolean,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.threadCreate,
      guildMember,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
