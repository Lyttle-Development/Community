import { GuildMember, LevelEvent } from '../../types';
import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { Message } from 'discord.js';
import { createEvent } from '../../modules';

const prefix: string = actionPrefix + 'onGuildMessageCreate.';

export async function onGuildMessageCreate(
  guildMember: GuildMember,
  message: Message,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.message,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
