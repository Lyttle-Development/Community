import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { ThreadChannel } from "discord.js";
import { GuildMember } from "../../types";

// This file's prefix
const prefix: string = actionPrefix + 'onGuildThreadCreate.';

// The execute function
export async function onGuildThreadCreate(
  guildMember: GuildMember,
  thread: ThreadChannel,
  newlyCreated: boolean
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, thread, newlyCreated),
  ];

  // Execute all actions
  await Promise.all(actions);
}
