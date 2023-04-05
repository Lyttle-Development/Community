import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { User } from "discord.js";

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateUserUpdate.';

// The execute function
export async function onPrivateUserUpdate(
  oldUser: User,
  newUser: User
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, oldUser, newUser),
  ];

  // Execute all actions
  await Promise.all(actions);
}
