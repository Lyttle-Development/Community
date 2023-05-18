import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { sendMessage } from '../../../utils';
import { openVoiceTopicModal } from './open-voice-topic-modal';

export function createVoiceTopicChannel(guildId, [channelId, content]) {
  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('openVoiceTopicModal')
      .setLabel('Create Channel')
      .setStyle(ButtonStyle.Success),
  );

  sendMessage(channelId, content ?? '', true, null, false, [buttons]);
}
