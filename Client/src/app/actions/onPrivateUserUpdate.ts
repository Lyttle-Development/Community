import { actionPrefix } from './index';
import { User } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateUserUpdate.';

// The execute function
export async function onPrivateUserUpdate(
  oldUser: User,
  newUser: User,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    // executor(prefix + 'test', test, oldUser, newUser),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
