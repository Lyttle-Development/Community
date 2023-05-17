import { GuildMember } from '../../../types';
import { ModalSubmitInteraction } from 'discord.js';
import { queue, QueueBacklogType } from '../../../utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { ModuleConfigCommunicationVoiceTopicTxtSuccess } from '../../../../../Content';

export async function createVoiceTopicChild(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
) {
  const { guildId } = guildMember;

  // get default variables
  const defaultVariables = await getMessageVariables(guildMember);

  const timeout = 10; // Seconds
  const deleteTime = Math.round(new Date().getTime() / 1000) + timeout;

  const createdVariables: ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables =
    {
      ...defaultVariables,
      time: deleteTime,
    };

  const msgCreated =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables>(
      guildId,
      'Communication.voice-topic.txt.success',
      createdVariables,
      false,
    );

  const action = async () =>
    await interaction.reply({
      content: msgCreated,
      ephemeral: true,
    });

  queue(QueueBacklogType.URGENT, action);
}
