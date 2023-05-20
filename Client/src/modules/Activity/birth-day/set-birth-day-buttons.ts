import { GuildMember } from '../../../types';
import { ButtonInteraction } from 'discord.js';
import { setBirthDayCache } from './set-birth-day-modal';
import { queue, QueueBacklogType } from '../../../utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import {
  ModuleConfigActivityBirthDayTxtResultFaulty,
  ModuleConfigActivityBirthDayTxtResultSuccess,
} from '../../../../../Content';
import { setMemberValue } from '../../../database/handlers';

export let birthdaysSetSinceLastRestart = 0;

/**
 * Executed when the user presses the submit button in the set birthday modal
 * @param guildMember
 * @param interaction
 */
export async function setBirthDaySubmitButton(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
) {
  // Get guildId and userId from guildMember
  const { guildId, userId } = guildMember;
  // Defer the interaction
  await interaction.deferUpdate();

  // Get user key for the cache.
  const userKey = `${guildMember.guildId}-${guildMember.userId}`;
  // Get the cache variables.
  const cache = setBirthDayCache[userKey];
  // Check if we got the variables.
  if (!cache) return;
  // Get the modal interaction & birthday.
  const [modalInteraction, birthday] = cache;
  // Delete the cache variables.
  delete setBirthDayCache[userKey];

  // Get the default variables.
  const defaultVariables = await getMessageVariables(guildMember);

  // Get the message content.
  const msgContent =
    await getMessage<ModuleConfigActivityBirthDayTxtResultSuccess.Variables>(
      guildId,
      'Activity.birth-day.txt.result-success',
      defaultVariables,
    );

  // Set the birthday in the database.
  await setMemberValue(guildId, userId, {
    birthday,
  });
  birthdaysSetSinceLastRestart++;

  // Create the action.
  const action = async () => {
    // Edit the modal interaction.
    await modalInteraction?.editReply({
      content: msgContent,
      embeds: [],
      components: [],
    });
  };
  // Queue the action.
  queue(QueueBacklogType.URGENT, action);
}

/**
 * Executed when the user presses the correct button in the set birthday modal
 * @param guildMember
 * @param interaction
 */
export async function setBirthDayCorrectButton(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
) {
  // Get guildId and userId from guildMember
  const { guildId } = guildMember;
  // Defer the interaction
  await interaction.deferUpdate();

  // Get user key for the cache.
  const userKey = `${guildMember.guildId}-${guildMember.userId}`;
  // Get the cache variables.
  const cache = setBirthDayCache[userKey];
  // Check if we got the variables.
  if (!cache) return;
  // Get the modal interaction.
  const [modalInteraction] = cache;
  // Delete the cache variables.
  delete setBirthDayCache[userKey];

  // Get the default variables.
  const defaultVariables = await getMessageVariables(guildMember);

  // Get the message content.
  const msgContent =
    await getMessage<ModuleConfigActivityBirthDayTxtResultFaulty.Variables>(
      guildId,
      'Activity.birth-day.txt.result-faulty',
      defaultVariables,
    );

  // Create the action.
  const action = async () => {
    // Edit the modal interaction.
    await modalInteraction?.editReply({
      content: msgContent,
      embeds: [],
      components: [],
    });
  };
  // Queue the action.
  queue(QueueBacklogType.URGENT, action);
}
