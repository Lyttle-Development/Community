import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMessageUpdate.';

// The execute function
export async function onGuildMessageUpdate(
  guildMember: GuildMember,
  oldMessage: Message,
  newMessage: Message,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.messageEdit,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
