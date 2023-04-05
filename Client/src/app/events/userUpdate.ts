import { User } from "discord.js";
import { onPrivateUserUpdate } from "../actions";

// Emitted whenever a user's details (e.g. username) are changed. Triggered by the Discord gateway events USER_UPDATE, GUILD_MEMBER_UPDATE, and PRESENCE_UPDATE.
async function userUpdate(oldUser: User, newUser: User): Promise<void> {
  // Ignore bots
  if (oldUser?.bot) return;

  // fire actions
  await onPrivateUserUpdate(oldUser, newUser);
}

export default userUpdate;
