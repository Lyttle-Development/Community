import { GuildMember } from '../../../types';
import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import {
  ModuleConfigCommunicationVoiceTopicTxtDialogLimit,
  ModuleConfigCommunicationVoiceTopicTxtDialogTitle,
  ModuleConfigCommunicationVoiceTopicTxtDialogTopic,
} from '../../../../../Content';

export async function openVoiceTopicModal(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
) {
  // get guildId
  const { guildId } = guildMember;

  // get default variables
  const defaultVariables = await getMessageVariables(guildMember);

  /**
   * Build modal
   */
  const msgTitle =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtDialogTitle.Variables>(
      guildId,
      'Communication.voice-topic.txt.dialog-title',
      defaultVariables,
      false,
    );

  // Create the modal
  const modal = new ModalBuilder()
    .setCustomId('createVoiceTopicChild')
    .setTitle(msgTitle);

  /**
   * Build Topic
   */
  const msgTopic =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtDialogTopic.Variables>(
      guildId,
      'Communication.voice-topic.txt.dialog-topic',
      defaultVariables,
      false,
    );

  const topicInput = new TextInputBuilder()
    .setCustomId('topic')
    .setLabel(msgTopic)
    .setStyle(TextInputStyle.Short);

  const topicRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      topicInput,
    );

  /**
   * Build Limit
   */
  const msgLimit =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtDialogLimit.Variables>(
      guildId,
      'Communication.voice-topic.txt.dialog-limit',
      defaultVariables,
      false,
    );

  const limitInput = new TextInputBuilder()
    .setCustomId('count')
    .setLabel(msgLimit)
    .setStyle(TextInputStyle.Short);
  const limitRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      limitInput,
    );

  // Add inputs to the modal
  modal.addComponents(topicRow, limitRow);

  // Show the modal to the user
  await interaction.showModal(modal);
}
