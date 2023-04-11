import { executor } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules/Activity/levels/create-event';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMessageUpdate.';

// The execute function
export async function onGuildMessageUpdate(
  guildMember: GuildMember,
  oldMessage: Message,
  newMessage: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.messageEdit,
      guildMember,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
