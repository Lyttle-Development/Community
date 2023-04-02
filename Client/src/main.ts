import environment from './utils/environment';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as fs from 'fs';

const client = new Client({
  allowedMentions: { parse: [] },
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

console.log('info', 'Caching events...', __filename);

const eventFiles = fs
  .readdirSync('./src/app/events')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace('.ts', ''));

console.log('info', `Loading events: ${eventFiles.join(', ')}`, __filename);

eventFiles.forEach((file, i) => {
  console.log('info', `Loading event ${eventFiles[i]}`, __filename);
  import(`./app/events/${file}`)
    .then(({ default: event }) => {
      if (typeof event === 'function') {
        if (event.once) {
          client.once(eventFiles[i], event);
        } else {
          client.on(eventFiles[i], event);
        }
        console.log('info', `Loaded event ${eventFiles[i]}`, __filename);
      } else {
        console.log(
          'warn',
          `Event ${eventFiles[i]} is not a function/event`,
          __filename
        );
      }
    })
    .catch((err) => {
      console.log(
        'error',
        `Could not load event ${eventFiles[i]}: ${err}`,
        __filename
      );
    });
});

console.log('info', `Events loaded`, __filename);

// Login to Discord with your client's token
client
  .login(environment.BOT_TOKEN)
  .then(() => console.log('info', `running`, __filename));

export default client;
