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
    // executor(prefix + 'test', test, userId, messageReaction, user),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
