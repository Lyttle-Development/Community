import {Presence} from 'discord.js';

// Emitted whenever a guild member's presence (e.g. status, activity) is changed.
async function presenceUpdate(
  oldPresence: Presence,
  newPresence: Presence
): Promise<void> {}

export default presenceUpdate;
