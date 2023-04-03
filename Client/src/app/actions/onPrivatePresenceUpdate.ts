import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { Presence } from "discord.js";

// This file's prefix
const prefix: string = actionPrefix + 'onPrivatePresenceUpdate.';

// The execute function
export async function onPrivatePresenceUpdate(
  userId: string,
  oldPresence: Presence,
  newPresence: Presence
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, userId, oldPresence, newPresence),
  ];

  // Execute all actions
  await Promise.all(actions);
}
