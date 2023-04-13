import { actionPrefix } from './index';
import { Message } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateMessageUpdate.';

// The execute function
export async function onPrivateMessageUpdate(
  userId: string,
  oldMessage: Message,
  newMessage: Message,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    // executor(prefix + 'test', test, userId, oldMessage, newMessage),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
