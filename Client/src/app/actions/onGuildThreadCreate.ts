import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { ThreadChannel } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildThreadCreate.';

// The execute function
export async function onGuildThreadCreate(
  guildMember: GuildMember,
  thread: ThreadChannel,
  newlyCreated: boolean,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.threadCreate,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
