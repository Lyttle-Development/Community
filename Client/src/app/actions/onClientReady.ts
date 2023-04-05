import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { Client } from "discord.js";

// This file's prefix
const prefix: string = actionPrefix + 'onClientReady.';

// The execute function
export async function onClientReady(client: Client): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [executor(prefix + 'test', test, client)];

  // Execute all actions
  await Promise.all(actions);
}
