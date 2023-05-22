import { actionPrefix } from './index';
import { Presence } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivatePresenceUpdate.';

// The execute function
export async function onPrivatePresenceUpdate(
  userId: string,
  oldPresence: Presence,
  newPresence: Presence,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    // executor(prefix + 'test', test, userId, oldPresence, newPresence),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
