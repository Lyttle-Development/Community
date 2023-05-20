import { GuildMember } from '../../../types';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionEditReplyOptions,
  ModalSubmitInteraction,
} from 'discord.js';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import {
  ModuleConfigActivityBirthDayTxtErrorDate,
  ModuleConfigActivityBirthDayTxtQuestionButtonCorrect,
  ModuleConfigActivityBirthDayTxtQuestionButtonIncorrect,
  ModuleConfigActivityBirthDayTxtQuestionConfirm,
  ModuleConfigActivityBirthDayTxtQuestionConfirmImageUrl,
} from '../../../../../Content';
import { getMonth, monthNumber } from '../../../utils/helpers/get-month';
import { isValidUrl } from '../../../utils/helpers/is-valid-url';
import { getBirthDayInt, queue, QueueBacklogType, sleep } from '../../../utils';

/**
 * The setBirthDayModal cache interface
 */
export interface SetBirthDayCache {
  [key: string]: [ModalSubmitInteraction, number];
}

/**
 * The setBirthDayModal cache
 */
export const setBirthDayCache: SetBirthDayCache = {};

/**
 * Executed when the user executes the setbday command
 * @param guildMember
 * @param interaction
 */
export async function setBirthDayModal(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
) {
  // Defer the interaction.
  await interaction.deferReply({ ephemeral: true });

  // Get the user key, this is used to store the cache.
  const userKey = `${guildMember.guildId}-${guildMember.userId}`;

  // Get the guildId from the guildMember.
  const { guildId } = guildMember;

  // Get the default variables.
  const defaultVariables = await getMessageVariables(guildMember);

  // Get the incorrect message
  const msgIncorrect =
    await getMessage<ModuleConfigActivityBirthDayTxtQuestionButtonIncorrect.Variables>(
      guildId,
      'Activity.birth-day.txt.question-button-incorrect',
      defaultVariables,
      false,
    );
  // Get the correct message
  const msgCorrect =
    await getMessage<ModuleConfigActivityBirthDayTxtQuestionButtonCorrect.Variables>(
      guildId,
      'Activity.birth-day.txt.question-button-correct',
      defaultVariables,
      false,
    );

  // Create the components.
  const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('setBirthDayButtonCorrect')
      .setLabel(msgIncorrect)
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('setBirthDayButtonSubmit')
      .setLabel(msgCorrect)
      .setStyle(ButtonStyle.Success),
  );

  // Get the month our of the modal.
  const month = interaction.fields.getTextInputValue('month');
  // Get the day our of the modal.
  const day = interaction.fields.getTextInputValue('day');
  // Construct a date object our of the month and day.
  const birthDate = new Date(`2000-${month}-${day} 12:00`);

  // Check if the date is valid.
  const birthDateValid = !birthDate?.getTime();
  if (birthDateValid) {
    // Get the error message.
    const msgDateError =
      await getMessage<ModuleConfigActivityBirthDayTxtErrorDate.Variables>(
        guildId,
        'Activity.birth-day.txt.error-date',
        defaultVariables,
      );

    // Create the action.
    const action = async () => {
      // Edit the reply.
      await interaction.editReply({
        content: msgDateError,
      });
    };
    // Queue the action.
    return queue(QueueBacklogType.URGENT, action);
  }

  // Get the month message.
  const msgMonth = await getMonth(
    defaultVariables,
    guildId,
    birthDate.getMonth() as monthNumber,
  );
  // Get the day message.
  const msgDay = birthDate.getDate().toString();

  // Get the message values.
  const messageValues: ModuleConfigActivityBirthDayTxtQuestionConfirm.Variables =
    {
      ...defaultVariables,
      month: msgMonth,
      day: msgDay,
    };

  // Get the message.
  let content =
    await getMessage<ModuleConfigActivityBirthDayTxtQuestionConfirm.Variables>(
      guildId,
      'Activity.birth-day.txt.question-confirm',
      messageValues,
    );

  // Get the image url.
  let imageUrl =
    await getMessage<ModuleConfigActivityBirthDayTxtQuestionConfirmImageUrl.Variables>(
      guildId,
      'Activity.birth-day.txt.question-confirm-image-url',
      messageValues,
      false,
    );

  // Update & fix the url
  imageUrl = imageUrl.split(' ').join('%20').split('\n')[0];
  // Check if the url is valid.
  const validUrl = isValidUrl(imageUrl);

  // Create the options
  let options: InteractionEditReplyOptions = {
    content,
    components: [components],
  };

  // Add the image if the url is valid.
  if (validUrl) {
    content = content + '\n ** **';
    // Update message
    options = {
      content,
      embeds: [
        {
          image: {
            url: imageUrl,
          },
        },
      ],
      components: [components],
    };
  }

  // Get the birth number.
  const birthNumber = getBirthDayInt(birthDate);
  // Set the cache.
  setBirthDayCache[userKey] = [interaction, birthNumber];

  // Create the action.
  const action = async () => {
    // Update message
    await interaction.editReply(options);
  };
  queue(QueueBacklogType.URGENT, action);

  // 1 minute timeout
  const timeout = 60 * 1000;

  // Wait for user to click on button
  await sleep(timeout);

  // If no user clicked on button, update message
  if (!setBirthDayCache[userKey]) return;

  const msgTimeout = await getMessage(
    guildId,
    'Activity.birth-day.txt.timeout',
    defaultVariables,
  );

  const action2 = async () => {
    if (!setBirthDayCache[userKey]) return;
    await interaction.editReply({
      content: msgTimeout,
      embeds: [],
      components: [],
    });
    delete setBirthDayCache[userKey];
  };
  queue(QueueBacklogType.URGENT, action2);
}
