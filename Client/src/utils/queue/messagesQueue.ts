import { AnyThreadChannel, TextChannel, ThreadChannel } from 'discord.js';
import { queue, QueueBacklogType } from './queue';
import { ALLOWED_MESSAGE_LENGTH } from '../../../constants';

const maxMessageLength = ALLOWED_MESSAGE_LENGTH ?? 2000;

interface ChannelsQueueItem {
  channel: TextChannel | AnyThreadChannel | ThreadChannel;
  content: string;
}

interface ChannelsQueue {
  [key: string]: ChannelsQueueItem[];
}

const channels: ChannelsQueue = {};

export function queueMessage(channel, content) {
  // If the channel doesn't exist, create it
  if (!channels[channel]) channels[channel] = [];

  // If the message is too long, return
  if (content.length > maxMessageLength) {
    // Split the message on every new line.
    const splitContent = content.split('\n');

    // Check if every line is less than the max length
    if (splitContent.every((line) => line.length < maxMessageLength)) {
      // If it is, add each line to the queue
      splitContent.forEach((line) => queueMessage(channel, line));
    }

    // Stop the function
    return;
  }

  // Create the item
  const item: ChannelsQueueItem = {
    channel,
    content,
  };

  // Add the item to the queue
  channels[channel].push(item);
}

export function checkMessagesQueue() {
  // Go through each channel
  for (const channel in channels) {
    // Get the channel / target
    let target = channels[channel][0]?.channel;

    // Get the queue
    const channelQueue = channels[channel];

    // Create a new array for the messages
    const messages: string[] = [];

    // If the queue isn't empty, start grouping the messages.
    if (channelQueue.length > 0) {
      // Set charter counter to 0
      let totalLength = 0;

      // Go through each item in the queue
      while (channelQueue.length > 0 && totalLength < maxMessageLength) {
        // Get the first item
        const item = channelQueue[0];

        // Check if the item would be too long to add to the current list.
        if (
          item.content.length + totalLength >=
          maxMessageLength - messages.length
        ) {
          // Force set the total length to the max length
          // This to prevent the loop from running forever.
          totalLength = maxMessageLength;
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

      if (content.length > maxMessageLength) return;

      // Send the message to queue
      queue(QueueBacklogType.NORMAL, () => {
        target.send({
          allowedMentions: { parse: [] },
          content,
        });
      });
    }

    // Cleanup the channel if it's empty
    if (channels[channel].length < 1) delete channels[channel];
  }
}
