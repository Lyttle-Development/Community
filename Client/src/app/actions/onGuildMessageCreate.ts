import { GuildMember, LevelEvent } from '../../types';
import { executor } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';
import { createEvent } from '../../modules/Activity/levels/create-event';

const prefix: string = actionPrefix + 'onGuildMessageCreate.';

export async function onGuildMessageCreate(
  guildMember: GuildMember,
  message: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.message,
      guildMember,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
