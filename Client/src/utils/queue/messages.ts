import {
  AnyThreadChannel,
  BaseMessageOptions,
  CommandInteraction,
  InteractionResponse,
  Message,
  MessageMentionOptions,
  TextChannel,
  ThreadChannel,
  User,
} from 'discord.js';
import client from '../../main';
import { queue as sendQueue, QueueBacklogType } from './queue';
import { queueMessage } from './messagesQueue';

export function sendMessage(
  channel:
    | string
    | TextChannel
    | AnyThreadChannel
    | ThreadChannel
    | Message
    | User,
  content: string,
  silent = true,
  embed = false,
  queue: QueueBacklogType | false = QueueBacklogType.NORMAL,
): Promise<Message> {
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
  const target: TextChannel | AnyThreadChannel | ThreadChannel | User = channel;

  const response: BaseMessageOptions = getResponse(content, silent, embed);

  // Create the action
  const action = () => target.send(response);

  // Send the message
  if (!queue) return action();
  if (silent && !embed && queue === QueueBacklogType.NORMAL) {
    queueMessage(target, content);
    return;
  }
  sendQueue(queue, action);
}

export function sendReply(
  message: Message | CommandInteraction,
  content: string,
  silent = true,
  embed = false,
  queue: QueueBacklogType | false = QueueBacklogType.NORMAL,
): Promise<Message | InteractionResponse | void> {
  const response: BaseMessageOptions = getResponse(content, silent, embed);

  // Create the action
  const action = () => message.reply(response);

  // Send the message
  if (!queue) return action();
  sendQueue(queue, action);
}

function getResponse(content, silent, embed) {
  // Set the allowed mentions
  const allowedMentions: MessageMentionOptions = silent
    ? { parse: [] }
    : { parse: ['users'] };

  // Set the response
  const response: BaseMessageOptions = embed
    ? {
        allowedMentions,
        embeds: [content],
      }
    : { allowedMentions, content };

  return response;
}
