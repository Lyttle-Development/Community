import {
  CommandInteraction,
  ContextMenuCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  User,
} from 'discord.js';
import { Command, GuildMember } from '../../../types';
import { formatNumber, queue, QueueBacklogType } from '../../../utils';
import {
  getOrCreateMemberModuleLevel,
  getOrCreateMemberModuleLevelDay,
} from '../../../database/handlers';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { MemberModuleLevel, MemberModuleLevelDay } from '@prisma/client';
import {
  ModuleConfigActivityLevelsCommandsGetLevelsFailed,
  ModuleConfigActivityLevelsCommandsGetLevelsOther,
  ModuleConfigActivityLevelsCommandsGetLevelsOthers,
  ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead,
  ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind,
  ModuleConfigActivityLevelsCommandsGetLevelsYourself,
  ModuleConfigActivityLevelsUnitLevel,
  ModuleConfigActivityLevelsUnitLevels,
  ModuleConfigActivityLevelsUnitPoint,
  ModuleConfigActivityLevelsUnitPoints,
} from '../../../../../Content';
import {
  getLevelDifficulty,
  getLevelsFromPoints,
  getPointsFromLevels,
} from './utils';
import client from '../../../main';

export let xpCommandsRanAfterLastRestart = 0;
export let xpFromContextMenuRanAfterLastRestart = 0;

/**
 * The command name
 * !! Not typed, so we can detect the command name !!
 */
export const commandName = 'xp' as const;

/**
 * The command data for the command
 */
export const commandData: Command = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('Get yours and others level information')
  .addUserOption((option) =>
    option
      .setName('member')
      .setDescription('Add one other member')
      .setRequired(false),
  )
  .addUserOption((option) =>
    option
      .setName('other-member')
      .setDescription('Add 2 members to check against')
      .setRequired(false),
  );

/**
 * The command data with the command name.
 * !! Not typed, so we can detect the command name !!
 */
export const getLevelsCommandData = {
  commandName,
  commandData,
} as const;

/**
 * The command function
 * Run when the command is used
 * @param guildMember
 * @param interaction
 */
export async function getLevelsCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  xpCommandsRanAfterLastRestart++;
  await interaction.deferReply({ ephemeral: true });
  // Get the users from the interaction
  const getUser1: User = interaction.options.get('member', false).user;
  const getUser2: User = interaction.options.get('other-member', false).user;

  // Get user 1, taking user 2, if no user 1 was specified.
  const user1: User = getUser1 ?? getUser2;
  // Get user 2, based on how user 1 was specified.
  const user2: User = getUser2?.id === user1?.id ? null : getUser2;

  // If no users were specified, get the level of the user who sent the command
  if ((!user1 && !user2) || (!user2 && user1?.id === guildMember.userId)) {
    return getOwnLevel(guildMember, interaction);
  }

  // If one user was specified, get the level of that user
  if (user1 && !user2) {
    return getOtherLevel(guildMember, interaction, user1);
  }

  // If two users were specified, get the level of both users
  if (user1 && user2) {
    return getOthersLevel(guildMember, interaction, user1, user2);
  }

  // If no state was matched, return an error.
  return getLevelsCommandFailed(guildMember, interaction);
}

/**
 * Send a error message when the get levels command failed.
 * @param guildMember
 * @param interaction
 */
async function getLevelsCommandFailed(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  // Get the guild id from the guild member
  const { guildId } = guildMember;

  // Get the message default variables
  const defaultVariables = await getMessageVariables(guildMember);

  // Get the error message
  const content =
    await getMessage<ModuleConfigActivityLevelsCommandsGetLevelsFailed.Variables>(
      guildId,
      'Activity.levels.commands.get-levels.failed',
      defaultVariables,
    );

  // Create the action
  const action = async () => {
    // Edit the reply
    await interaction.editReply({ content });
  };
  // Queue the action
  queue(QueueBacklogType.URGENT, action);
}

/**
 * Build the message variables and get the database entry for given user.
 * @param guildMember
 * @param userId
 */
async function getMessageAndMemberDb<
  T = ModuleConfigActivityLevelsCommandsGetLevelsYourself.Variables,
>(guildMember: GuildMember, userId?: string): Promise<[T, MemberModuleLevel]> {
  // Get guild id from guild member
  const { guildId } = guildMember;
  // Get userid from function, otherwise use guild member
  userId = userId ?? guildMember.userId;
  // Update the guild member with the user id
  guildMember.userId = userId;

  // Get the member module level
  const db_MemberModuleLevel: MemberModuleLevel =
    await getOrCreateMemberModuleLevel(guildId, userId);

  // Get the message default variables
  const defaultVariables = await getMessageVariables(guildMember);

  // Get the level from the points
  const levels =
    (await getLevelsFromPoints(guildId, db_MemberModuleLevel.points)) ?? 0;
  // Get the next level
  const nextLevel = levels + 1;
  // Get the level unit key
  const levelUnitKey = levels > 1 ? 'levels' : 'level';
  // Get the level unit
  const levelsUnit = await getMessage<
    | ModuleConfigActivityLevelsUnitLevel.Variables
    | ModuleConfigActivityLevelsUnitLevels.Variables
  >(guildId, `Activity.levels.unit.${levelUnitKey}`, defaultVariables, false);

  // Get the points
  const points = db_MemberModuleLevel.points ?? 0;
  // Get the points unit key
  const pointUnitKey = points > 1 ? 'points' : 'points';
  // Get the points needed for the next level
  const neededPointsNextLevel = await getPointsFromLevels(guildId, nextLevel);
  // Get the points unit
  const pointsUnit = await getMessage<
    | ModuleConfigActivityLevelsUnitPoint.Variables
    | ModuleConfigActivityLevelsUnitPoints.Variables
  >(guildId, `Activity.levels.unit.${pointUnitKey}`, defaultVariables, false);

  // Get the times harder
  const timesHarder = (await getLevelDifficulty(guildId, levels)) ?? 0;

  // Get the member module level
  const db_MemberModuleLevelDay: MemberModuleLevelDay =
    await getOrCreateMemberModuleLevelDay(guildId, userId);

  // Get the recent levels
  const recentLevels = await getLevelsFromPoints(
    guildId,
    db_MemberModuleLevelDay.points ?? 0,
  );
  // Get the recent points
  const recentPoints = db_MemberModuleLevelDay.points ?? 0;

  // Build the message variables
  const messageVars: T = {
    ...defaultVariables,
    recentLevels: formatNumber(recentLevels),
    levels: formatNumber(levels),
    levelsUnit,
    nextLevel: formatNumber(nextLevel),
    points: formatNumber(points),
    pointsUnit,
    recentPoints: formatNumber(recentPoints),
    neededPointsNextLevel: formatNumber(neededPointsNextLevel),
    timesHarder: formatNumber(timesHarder),
  } as T;

  // Return the message variables and the member module level
  return [messageVars, db_MemberModuleLevel];
}

/**
 * Fetch all data for the command and send the response for the command executor.
 * @param guildMember
 * @param interaction
 */
async function getOwnLevel(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  // Get guild id from guild member
  const { guildId } = guildMember;

  // Get the message variables and the member module level
  const [messageVars] =
    await getMessageAndMemberDb<ModuleConfigActivityLevelsCommandsGetLevelsYourself.Variables>(
      guildMember,
    );

  // Build the content
  const content =
    await getMessage<ModuleConfigActivityLevelsCommandsGetLevelsYourself.Variables>(
      guildId,
      'Activity.levels.commands.get-levels.yourself',
      messageVars,
    );

  // Build the action
  const action = async () => {
    // Send the message/response
    await interaction.editReply({ content });
  };
  // Queue the action
  queue(QueueBacklogType.URGENT, action);
}

/**
 * Fetch all data for the command and send the response for the given member.
 * @param guildMember
 * @param interaction
 * @param user
 */
async function getOtherLevel(
  guildMember: GuildMember,
  interaction: CommandInteraction,
  user: User,
) {
  // Get guild id from guild member
  const { guildId } = guildMember;

  // Get the message variables and the member module level
  const [messageVars] =
    await getMessageAndMemberDb<ModuleConfigActivityLevelsCommandsGetLevelsOther.Variables>(
      guildMember,
      user.id,
    );

  // Build the content
  const content =
    await getMessage<ModuleConfigActivityLevelsCommandsGetLevelsOther.Variables>(
      guildId,
      'Activity.levels.commands.get-levels.other',
      messageVars,
    );

  // Build the action
  const action = async () => {
    // Send the message/response
    await interaction.editReply({ content });
  };
  // Queue the action
  queue(QueueBacklogType.URGENT, action);
}

/**
 * Build the state for the given user.
 * This is used as a message variable inside 'others' command.
 * @param guildId
 * @param db_User1
 * @param messageVarsUser1
 * @param db_User2
 * @param messageVarsUser2
 */
async function getUsersState<T>(
  guildId: string,
  db_User1: MemberModuleLevel,
  messageVarsUser1:
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead.Variables
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind.Variables,
  db_User2: MemberModuleLevel,
  messageVarsUser2:
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead.Variables
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind.Variables,
): Promise<[string, string]> {
  // Get the points difference
  let pointsDiff = db_User1.points - db_User2.points || 0;
  // If the points difference is negative
  pointsDiff = pointsDiff < 0 ? pointsDiff * -1 : pointsDiff;
  // Get the levels difference
  const levelsDiff = await getLevelsFromPoints(guildId, pointsDiff);

  // copy the message variables
  const msgVars1 = { ...messageVarsUser1 };
  const msgVars2 = { ...messageVarsUser2 };
  // Update points in message variables
  msgVars1.points = formatNumber(pointsDiff);
  msgVars2.points = formatNumber(pointsDiff);
  // Update levels in message variables
  msgVars1.levels = formatNumber(levelsDiff);
  msgVars2.levels = formatNumber(levelsDiff);

  // Get the user states
  const user1Ahead = db_User1.points > db_User2.points;
  // Build the user state string
  const user1State = await getUserState(guildId, user1Ahead, msgVars1);

  // Get the user states
  const user2Ahead = db_User2.points > db_User1.points;
  // Build the user state string
  const user2State = await getUserState(guildId, user2Ahead, msgVars2);

  // Return the user states
  return [user1State, user2State];
}

/**
 * Get a single user state.
 * @param guildId
 * @param ahead
 * @param messageVars
 */
async function getUserState(
  guildId: string,
  ahead: boolean,
  messageVars:
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead.Variables
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind.Variables,
): Promise<string> {
  // Get the user state key
  const userStateKey = ahead ? 'ahead' : 'behind';

  // Return the user state string
  return getMessage<
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead.Variables
    | ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind.Variables
  >(
    guildId,
    `Activity.levels.commands.get-levels.others-${userStateKey}`,
    messageVars,
    false,
  );
}

/**
 * Fetch all data for the command and send the response for the given members.
 * @param guildMember
 * @param interaction
 * @param user1
 * @param user2
 */
async function getOthersLevel(
  guildMember: GuildMember,
  interaction: CommandInteraction,
  user1: User,
  user2: User,
) {
  // Get guild id from guild member
  const { guildId } = guildMember;

  // Get the message variables and the member module level
  const [messageVarsUser1, db_User1] =
    await getMessageAndMemberDb<ModuleConfigActivityLevelsCommandsGetLevelsOthers.Variables>(
      guildMember,
      user1.id,
    );

  // Get the message variables and the member module level
  const [messageVarsUser2, db_User2] =
    await getMessageAndMemberDb<ModuleConfigActivityLevelsCommandsGetLevelsOthers.Variables>(
      guildMember,
      user2.id,
    );

  // Get the user states
  const [user1State, user2State] = await getUsersState(
    guildId,
    db_User1,
    messageVarsUser1,
    db_User2,
    messageVarsUser2,
  );

  // Update the message variables
  messageVarsUser1.stateText = user1State;
  messageVarsUser2.stateText = user2State;

  // Build the content for user 1
  const messageUser1 =
    await getMessage<ModuleConfigActivityLevelsCommandsGetLevelsOthers.Variables>(
      guildId,
      'Activity.levels.commands.get-levels.others',
      messageVarsUser1,
    );

  // Build the content for user 2
  const messageUser2 =
    await getMessage<ModuleConfigActivityLevelsCommandsGetLevelsOthers.Variables>(
      guildId,
      'Activity.levels.commands.get-levels.others',
      messageVarsUser2,
    );

  // Build the embed
  const messageEmbed = new EmbedBuilder()
    .setColor('#1e1e23')
    .setTitle('Levels difference stats:')
    .setFields([
      {
        name: `${user1.tag}`,
        value: messageUser1,
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true,
      },
      {
        name: `${user2.tag}`,
        value: messageUser2,
        inline: true,
      },
    ]);

  // Build the action
  const action = async () => {
    // Send the message/response
    await interaction.editReply({ content: '', embeds: [messageEmbed] });
  };
  // Queue the action
  queue(QueueBacklogType.URGENT, action);
}

export const AppCommandName = 'Get points' as const;

export const getMemberLevelsAppData = {
  commandName: AppCommandName,
  commandData: {
    name: AppCommandName,
    type: 2,
    description: null,
  },
} as const;

export async function getMemberLevelsApp(
  guildMember: GuildMember,
  interaction: ContextMenuCommandInteraction,
) {
  xpFromContextMenuRanAfterLastRestart++;
  await interaction.deferReply({ ephemeral: true });
  let userId = interaction.targetId;
  userId = userId ?? guildMember.userId;

  if (userId === guildMember.userId) {
    return getOwnLevel(guildMember, interaction);
  }

  const user: User = client.users.cache.get(userId);
  return getOtherLevel(guildMember, interaction, user);
}

export const AppCommandOthersName = 'Compare points' as const;

export const getOthersLevelsAppData = {
  commandName: AppCommandOthersName,
  commandData: {
    name: AppCommandOthersName,
    type: 2,
    description: null,
  },
} as const;

export async function getOthersLevelsApp(
  guildMember: GuildMember,
  interaction: ContextMenuCommandInteraction,
) {
  xpFromContextMenuRanAfterLastRestart++;
  await interaction.deferReply({ ephemeral: true });
  let userId = interaction.targetId;
  userId = userId ?? guildMember.userId;

  const yourselfId = guildMember.userId;

  if (userId === yourselfId) {
    return getOwnLevel(guildMember, interaction);
  }

  const otherUser: User = client.users.cache.get(userId);
  const yourselfUser: User = client.users.cache.get(yourselfId);
  return getOthersLevel(guildMember, interaction, otherUser, yourselfUser);
}
