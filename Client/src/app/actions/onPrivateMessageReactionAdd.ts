import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { MessageReaction, User } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateMessageReactionAdd.';

// The execute function
export async function onPrivateMessageReactionAdd(
  userId: string,
  messageReaction: MessageReaction,
  user: User,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'test', test, userId, messageReaction, user),
  ];

  // Execute all actions
  await Promise.all(actions);
}
