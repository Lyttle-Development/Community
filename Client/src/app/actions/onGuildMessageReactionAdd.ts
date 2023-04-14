import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { MessageReaction, User } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMessageReactionAdd.';

// The execute function
export async function onGuildMessageReactionAdd(
  guildMember: GuildMember,
  messageReaction: MessageReaction,
  user: User,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.reaction,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
