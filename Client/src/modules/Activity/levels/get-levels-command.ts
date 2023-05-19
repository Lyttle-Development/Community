import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  User,
} from 'discord.js';
import { Command, GuildMember, LogType } from '../../../types';
import { formatNumber, log, queue, QueueBacklogType } from '../../../utils';
import {
  getOrCreateMemberModuleLevel,
  getOrCreateMemberModuleLevelDay,
} from '../../../database/handlers';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { MemberModuleLevel, MemberModuleLevelDay } from '@prisma/client';
import {
  ModuleConfigActivityLevelsCommandsGetLevelsOther,
  ModuleConfigActivityLevelsCommandsGetLevelsOthers,
  ModuleConfigActivityLevelsCommandsGetLevelsYourself,
} from '../../../../../Content';
import {
  getLevelDifficulty,
  getLevelsFromPoints,
  getPointsFromLevels,
} from './utils';

/**
 * The data for the get levels command
 */
export const getLevelsCommandData: Command = new SlashCommandBuilder()
  .setName('xp')
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
 * The get level command logic.
 * Run when a user uses the get level command.
 * @param guildMember
 * @param interaction
 */
export async function getLevelsCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  await interaction.deferReply({ ephemeral: true });
  // Get the users from the interaction
  const getUser1: User = interaction.options.getUser('member', false);
  const getUser2: User = interaction.options.getUser('other-member', false);

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
function getLevelsCommandFailed(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  log(LogType.ERROR, 'getLevelsCommandFailed');
  return;
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
  const levels = await getLevelsFromPoints(
    guildId,
    db_MemberModuleLevel.points,
  );
  // Get the next level
  const nextLevel = levels + 1;
  // Get the level unit key
  const levelUnitKey = levels > 1 ? 'levels' : 'level';
  // Get the level unit
  const levelsUnit = await getMessage(
    guildId,
    `Activity.levels.unit.${levelUnitKey}`,
    defaultVariables,
    false,
  );

  // Get the points
  const points = db_MemberModuleLevel.points;
  // Get the points unit key
  const pointUnitKey = points > 1 ? 'points' : 'points';
  // Get the points needed for the next level
  const neededPointsNextLevel = await getPointsFromLevels(guildId, nextLevel);
  // Get the points unit
  const pointsUnit = await getMessage(
    guildId,
    `Activity.levels.unit.${pointUnitKey}`,
    defaultVariables,
    false,
  );

  // Get the times harder
  const timesHarder = await getLevelDifficulty(guildId, levels);

  // Get the member module level
  const db_MemberModuleLevelDay: MemberModuleLevelDay =
    await getOrCreateMemberModuleLevelDay(guildId, userId);

  // Get the recent levels
  const recentLevels = await getLevelsFromPoints(
    guildId,
    db_MemberModuleLevelDay.points,
  );
  // Get the recent points
  const recentPoints = db_MemberModuleLevelDay.points;

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
  messageVarsUser1: T,
  db_User2: MemberModuleLevel,
  messageVarsUser2: T,
): Promise<[string, string]> {
  // Get the user states
  const user1Ahead = db_User1.points > db_User2.points;
  // Build the user state string
  const user1State = await getUserState(guildId, user1Ahead, messageVarsUser1);

  // Get the user states
  const user2Ahead = db_User2.points > db_User1.points;
  // Build the user state string
  const user2State = await getUserState(guildId, user2Ahead, messageVarsUser2);

  // Return the user states
  return [user1State, user2State];
}

/**
 * Get a single user state.
 * @param guildId
 * @param ahead
 * @param messageVars
 */
async function getUserState<T>(
  guildId: string,
  ahead: boolean,
  messageVars: T,
): Promise<string> {
  // Get the user state key
  const userStateKey = ahead ? 'ahead' : 'behind';

  // Return the user state string
  return getMessage<T>(
    guildId,
    `Activity.levels.commands.get-levels.others-${userStateKey}`,
    messageVars,
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
