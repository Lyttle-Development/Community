import { environment, executor } from './utils';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as fs from 'fs';
import { initQueue } from './utils/queue/queue';

export { isReady } from './app/events/ready';

export const client = new Client({
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

console.log('info', 'Caching events...');

const eventFiles = fs
  .readdirSync('./src/app/events')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace('.ts', ''));

console.log('info', `Found event files:\n - ${eventFiles.join('\n - ')}`);
console.log('info', 'Loading events...');

eventFiles.forEach((file, i) => {
  import(`./app/events/${file}`)
    .then(({ default: event }) => {
      if (typeof event === 'function') {
        if (event.once) {
          client.once(eventFiles[i], (...args) =>
            // Use executor to execute the event, catching any errors that creep up,
            // and thus preventing the bot from crashing. and auto disabling that event.
            executor('main.' + file, event, ...args),
          );
        } else {
          client.on(eventFiles[i], (...args) =>
            // Use executor to execute the event, catching any errors that creep up,
            // and thus preventing the bot from crashing. and auto disabling that event.
            executor('main.' + file, event, ...args),
          );
        }
        console.log('info', `Loaded event ${eventFiles[i]}`);
      } else {
        console.log('warn', `Event ${eventFiles[i]} is not a function/event`);
      }
    })
    .catch((err) => {
      console.log('error', `Could not load event ${eventFiles[i]}: ${err}`);
    });
});

// Login to Discord with your client's token
client.login(environment.BOT_TOKEN).then(() => console.log('info', 'running'));

export const bootdate = new Date();
initQueue();

export default client;
