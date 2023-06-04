import client from '../../../main';
import {
  findEveryMember,
  getOrCreateGuildModuleBirthday,
} from '../../../database/handlers';
import {
  getBirthDayInt,
  queue,
  QueueBacklogType,
  sendMessage,
} from '../../../utils';
import { ChannelType } from 'discord.js';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ModuleConfigActivityBirthDayTxtAnnouncement } from '../../../../../Content';
import { GuildMember } from '../../../types';

let currentDay: string | null = null;

const setLocalStorageDay = (): boolean => {
  // Get date
  const today = new Date();
  // copy last value
  const lastDay = currentDay?.slice() ?? '';

  // If a new day happend (after 11:00)
  if (today.getHours() >= 11) {
    // Set current day
    currentDay = today.toLocaleDateString();
  } else {
    // Set current day to yesterday
    if (today.getHours() >= 0) today.setDate(today.getDate() - 1);
    // Set current day
    currentDay = today.toLocaleDateString();
  }

  // Check if last day is not equal to current day
  return lastDay !== currentDay;
};

/**
 * A function that checks if a new day has started.
 * This especially checks if the time is after 11:00.
 * For a birthday to be triggered!
 */
export function checkTodayChange(): void {
  // Set day on first run
  if (!currentDay) setLocalStorageDay();

  // Trigger new day check
  const newDay = setLocalStorageDay();

  // Check against new day
  if (!newDay) return;

  // Trigger new day
  void triggerNewDay();
}

async function triggerNewDay() {
  // Get date
  const today = new Date();
  // Set time to 12:00
  today.setHours(12, 0, 0, 0);

  // Get server guilds
  const guilds = client.guilds.cache.map((guild) => guild.id);
  // If no guilds were found kill function.
  if (guilds.length < 1) return;

  // Loop through guilds
  for (const guildId of guilds) {
    // Trigger birthday for guild
    await triggerBirthdayForGuild(guildId, today);
  }
}

async function triggerBirthdayForGuild(
  guildId: string,
  today: Date,
): Promise<void> {
  // Find all users who have a birthday today.
  const bDayInt: number = getBirthDayInt(today);

  // Get all users with birthday today
  const users = await findEveryMember(guildId, { birthday: bDayInt });
  // Get all user ids
  const userIds = users.map((u) => u.user_id.toString());
  // If no users found stop.
  if (userIds.length < 1) return;

  // Get server settings for events
  const db_GuildModuleBirthday = await getOrCreateGuildModuleBirthday(guildId);
  // Check if we got a result
  if (!db_GuildModuleBirthday) return;
  // Check if module is enabled
  if (!db_GuildModuleBirthday.enabled) return;

  // Get channel id
  const birthdayChannelId =
    db_GuildModuleBirthday.birthday_channel_id.toString();

  // Check for channel
  if (!birthdayChannelId || birthdayChannelId.length < 1) return;
  // Send message
  await sendBirthdayMessage(guildId, birthdayChannelId, userIds);
}

async function sendBirthdayMessage(
  guildId: string,
  birthdayChannelId: string,
  userIds: string[],
) {
  // Get channel
  const channel = client.channels.cache.get(birthdayChannelId) ?? null;
  // Check if no channel has been found
  if (!channel) return;
  // Check if channel is a text channel
  if (channel.type !== ChannelType.GuildText) return;

  // Create message users
  const msgUsers = userIds
    .map((userId, i) => {
      // If last user
      if (userIds.length > 1 && userIds.length - 1 === i) {
        return ` & <@${userId}>`;
      }

      // If first user
      if (i === 0) {
        return `<@${userId}>`;
      }

      // If middle user
      return `, <@${userId}>`;
    })
    // Join all users into one string
    .join('');

  // Create fake guild member for the default message variables.
  const fakeGuildMember: GuildMember = { guildId, userId: '0' };

  // Get the default variables.
  const defaultVariables = await getMessageVariables(fakeGuildMember);

  // Create the message variables.
  const messageVariables: ModuleConfigActivityBirthDayTxtAnnouncement.Variables =
    {
      guild: defaultVariables.guild,
      guildId: defaultVariables.guildId,
      prefix: defaultVariables.prefix,
      users: msgUsers,
    };

  // Get the message content.
  const msgContent =
    await getMessage<ModuleConfigActivityBirthDayTxtAnnouncement.Variables>(
      guildId,
      'Activity.birth-day.txt.announcement',
      messageVariables,
    );

  // Create the action
  const action = async (): Promise<void> => {
    // Send message
    await sendMessage(channel, msgContent);
  };

  // Add the action to the queue
  queue(QueueBacklogType.BACKGROUND, action);
}
