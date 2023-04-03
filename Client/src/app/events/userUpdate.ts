import {User} from 'discord.js';

// Emitted whenever a user's details (e.g. username) are changed. Triggered by the Discord gateway events USER_UPDATE, GUILD_MEMBER_UPDATE, and PRESENCE_UPDATE.
async function userUpdate(oldUser: User, newUser: User): Promise<void> {}

export default userUpdate;
