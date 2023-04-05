import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { CommandInteraction } from "discord.js";

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateInteractionCommand.';

// The execute function
export async function onPrivateInteractionCommand(
  userId: string,
  interaction: CommandInteraction
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, userId, interaction),
  ];

  // Execute all actions
  await Promise.all(actions);
}
