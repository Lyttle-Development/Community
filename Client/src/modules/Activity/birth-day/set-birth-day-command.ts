import {
  ActionRowBuilder,
  CommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Command, GuildMember } from '../../../types';
import { getOrCreateMember } from '../../../database/handlers';
import { queue, QueueBacklogType } from '../../../utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import {
  ModuleConfigActivityBirthDayTxtErrorSet,
  ModuleConfigActivityBirthDayTxtModalQuestionDay,
  ModuleConfigActivityBirthDayTxtModalQuestionMonth,
  ModuleConfigActivityBirthDayTxtModalTitle,
} from '../../../../../Content';

/**
 * The command name
 * !! Not typed, so we can detect the command name !!
 */
export const commandName = 'setbday' as const;

/**
 * The command data for the command
 */
export const commandData: Command = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('Sets your own birthday, so no one forgets!');

/**
 * The command data with the command name.
 * !! Not typed, so we can detect the command name !!
 */
export const setBirthDayCommandData = {
  commandName,
  commandData,
} as const;

/**
 * The command function
 * Run when the command is used
 * @param guildMember
 * @param interaction
 */
export async function setBirthDayCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  // Get guildId and userId from interaction
  const { guildId, userId } = guildMember;

  // Get or create member
  const db_Member = await getOrCreateMember(guildId, userId);

  // Check if birthday is already set
  if (db_Member?.birthday) return birthDayAlreadySet(guildMember, interaction);
  // Ask for birthday
  return askForBirthDay(guildMember, interaction);
}

async function birthDayAlreadySet(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  // Get guildId
  const { guildId } = guildMember;

  // get default variables
  const defaultVariables = await getMessageVariables(guildMember);
  /**
   * Build modal
   */
  // Get message
  const content =
    await getMessage<ModuleConfigActivityBirthDayTxtErrorSet.Variables>(
      guildId,
      'Activity.birth-day.txt.error-set',
      defaultVariables,
      false,
    );

  // Create the action
  const action = async () => {
    // Reply to the interaction
    await interaction.reply({
      content,
      ephemeral: true,
    });
  };
  // Queue the action
  queue(QueueBacklogType.URGENT, action);
}

async function askForBirthDay(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  // Get guildId
  const { guildId } = guildMember;

  // get default variables
  const defaultVariables = await getMessageVariables(guildMember);
  /**
   * Build modal
   */
  // Get message
  const msgTitle =
    await getMessage<ModuleConfigActivityBirthDayTxtModalTitle.Variables>(
      guildId,
      'Activity.birth-day.txt.modal-title',
      defaultVariables,
      false,
    );

  // Create the modal
  const modal = new ModalBuilder()
    .setCustomId('setBirthDayModal')
    .setTitle(msgTitle);

  /**
   * Build month input
   */
  // Get message
  const msgMonth =
    await getMessage<ModuleConfigActivityBirthDayTxtModalQuestionMonth.Variables>(
      guildId,
      'Activity.birth-day.txt.modal-question-month',
      defaultVariables,
      false,
    );

  // Create the input
  const monthInput = new TextInputBuilder()
    .setCustomId('month')
    .setLabel(msgMonth)
    .setStyle(TextInputStyle.Short);

  // Create the row
  const monthRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      monthInput,
    );

  /**
   * Build day input
   */
  // Get message
  const msgDay =
    await getMessage<ModuleConfigActivityBirthDayTxtModalQuestionDay.Variables>(
      guildId,
      'Activity.birth-day.txt.modal-question-day',
      defaultVariables,
      false,
    );

  // Create the input
  const dayInput = new TextInputBuilder()
    .setCustomId('day')
    .setLabel(msgDay)
    .setStyle(TextInputStyle.Short);

  // Create the row
  const dayRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      dayInput,
    );

  // Add inputs to the modal
  modal.addComponents(monthRow, dayRow);

  // Show the modal to the user
  await interaction.showModal(modal);
}
