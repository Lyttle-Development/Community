import { AnyThreadChannel, TextChannel, ThreadChannel } from 'discord.js';
import { queue, QueueBacklogType } from './queue';
import { ALLOWED_MESSAGE_LENGTH } from '../../../constants';

export interface MessageQueueChannel {
  channel: TextChannel | AnyThreadChannel | ThreadChannel;
  content: string;
}

export interface MessageQueueChannels {
  [key: string]: MessageQueueChannel[];
}

// The message queue
export const messageQueueChannels: MessageQueueChannels = {};

/**
 * Add a message to the queue.
 * @param channel
 * @param content
 */
export function queueMessage(channel, content) {
  // If the channel doesn't exist, create it
  if (!messageQueueChannels[channel]) messageQueueChannels[channel] = [];

  // If the message is too long, return
  if (content.length > ALLOWED_MESSAGE_LENGTH) {
    // Split the message on every new line.
    const splitContent = content.split('\n');

    // Check if every line is less than the max length
    if (splitContent.every((line) => line.length < ALLOWED_MESSAGE_LENGTH)) {
      // If it is, add each line to the queue
      splitContent.forEach((line) => queueMessage(channel, line));
    }

    // Stop the function
    return;
  }

  // Create the item
  const item: MessageQueueChannel = {
    channel,
    content,
  };

  // Add the item to the queue
  messageQueueChannels[channel].push(item);
}

/**
 * Check the message queue and send the messages.
 */
export function checkMessagesQueue() {
  // Go through each channel
  for (const channel in messageQueueChannels) {
    // Get the channel / target
    let target = messageQueueChannels[channel][0]?.channel;

    // Get the queue
    const channelQueue = messageQueueChannels[channel];

    // Create a new array for the messages
    const messages: string[] = [];

    // If the queue isn't empty, start grouping the messages.
    if (channelQueue.length > 0) {
      // Set charter counter to 0
      let totalLength = 0;

      // Go through each item in the queue
      while (channelQueue.length > 0 && totalLength < ALLOWED_MESSAGE_LENGTH) {
        // Get the first item
        const item = channelQueue[0];

        // Check if the item would be too long to add to the current list.
        if (
          item.content.length + totalLength >=
          ALLOWED_MESSAGE_LENGTH - messages.length
        ) {
          // Force set the total length to the max length
          // This to prevent the loop from running forever.
          totalLength = ALLOWED_MESSAGE_LENGTH;
          break;
        }

        // If it passed, remove it from the queue and add it to the list.
        channelQueue.shift();
        totalLength += item.content.length;
        messages.push(item.content);
        if (!target) target = item?.channel;
      }
    }

    // If we have a target and messages, send them.
    if (target && messages.length > 0) {
      // Join the messages
      const content = messages.join('\n');

      if (content.length > ALLOWED_MESSAGE_LENGTH) return;

      // Send the message to queue
      queue(QueueBacklogType.NORMAL, () => {
        target.send({
          allowedMentions: { parse: [] },
          content,
        });
      });
    }

    // Cleanup the channel if it's empty
    if (messageQueueChannels[channel].length < 1) {
      delete messageQueueChannels[channel];
    }
  }
}
