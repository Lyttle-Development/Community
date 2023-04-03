import { executor, test } from "../../utils";
import { actionPrefix } from "./index";
import { MessageReaction, User } from "discord.js";
import { GuildMember } from "../../types/app/GuildMember";

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMessageReactionAdd.';

// The execute function
export async function onGuildMessageReactionAdd(
  guildMember: GuildMember,
  messageReaction: MessageReaction,
  user: User
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [
    executor(prefix + 'test', test, guildMember, messageReaction, user),
  ];

  // Execute all actions
  await Promise.all(actions);
}
