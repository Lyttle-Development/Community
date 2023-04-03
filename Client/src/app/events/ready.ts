import { Client } from 'discord.js';

export let isReady: boolean = false;

// Emitted when the client becomes ready to start working.
function ready(client: Client): void {
  isReady = true;
}

export default ready;
