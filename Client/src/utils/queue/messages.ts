import {
  AnyThreadChannel,
  BaseMessageOptions,
  CommandInteraction,
  GuildTextBasedChannel,
  InteractionResponse,
  Message,
  MessageMentionOptions,
  TextChannel,
  ThreadChannel,
  User,
} from 'discord.js';
import client, { isReady } from '../../main';
import { queue as sendQueue, QueueBacklogType } from './queue';
import { queueMessage } from './messages-queue';
import { sleep } from '../helpers';

/**
 * Send a message to a target.
 * @param channel
 * @param content
 * @param silent
 * @param embed
 * @param queue
 */
export async function sendMessage(
  channel:
    | string
    | TextChannel
    | GuildTextBasedChannel
    | AnyThreadChannel
    | ThreadChannel
    | Message
    | User,
  content: string,
  silent = true,
  embed = false,
  queue: QueueBacklogType | false = QueueBacklogType.NORMAL,
  components?: any,
): Promise<Message> {
  // If the client isn't ready, wait a second and try again
  if (!isReady) {
    // Wait a second
    await sleep(1000);
    // Try again
    return sendMessage(channel, content, silent, embed, queue, components);
  }

  // Resolve the channel if it's a string
  if (typeof channel === 'string') {
    channel = client.channels.resolve(channel) as TextChannel;
  }

  // Retype the channel if it's a message
  if (channel instanceof Message) {
    channel = channel.channel as TextChannel;
  }

  // If the channel is still a string, return
  if (typeof channel === 'string') return;

  // Retype the channel
  const target:
    | TextChannel
    | GuildTextBasedChannel
    | AnyThreadChannel
    | ThreadChannel
    | User = channel;

  const response: BaseMessageOptions = getResponse(
    content,
    silent,
    embed,
    components,
  );

  // Create the action
  const action = () => target.send(response);

  // Send the message
  if (!queue) return action();
  if (silent && !embed && !components && queue === QueueBacklogType.NORMAL) {
    // Add the message to the message queue
    queueMessage(target, content);
    return;
  }

  // Add the message to the queue
  sendQueue(queue, action);
}

/**
 * Send a reply to a message.
 * @param message
 * @param content
 * @param silent
 * @param embed
 * @param queue
 */
export function sendReply(
  message: Message | CommandInteraction,
  content: string,
  silent = true,
  embed = false,
  queue: QueueBacklogType | false = QueueBacklogType.NORMAL,
  components?: any,
): Promise<Message | InteractionResponse | void> {
  const response: BaseMessageOptions = getResponse(
    content,
    silent,
    embed,
    components,
  );

  // Create the action
  const action = () => message.reply(response);

  // Send the message
  if (!queue) return action();

  // Add the message to the queue
  sendQueue(queue, action);
}

/**
 * Get variables needed to send the message.
 * @param content
 * @param silent
 * @param embed
 */
function getResponse(content, silent, embed, components) {
  // Set the allowed mentions
  const allowedMentions: MessageMentionOptions = silent
    ? { parse: [] }
    : { parse: ['users'] };

  // Set the response
  const response: BaseMessageOptions = embed
    ? {
        allowedMentions,
        embeds: [content],
        components,
      }
    : { allowedMentions, content, components };

  // Return the response
  return response;
}
