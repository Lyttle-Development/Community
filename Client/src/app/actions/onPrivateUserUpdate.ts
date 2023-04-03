import { executor, test } from '../../utils';
import { prefix as actionPrefix } from './index';
import { Message } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateUserUpdate.';

// The execute function
export async function onPrivateUserUpdate(
  userId: string,
  message: Message
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, userId, message),
  ];

  // Execute all actions
  await Promise.all(actions);
}
