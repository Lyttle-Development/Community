import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { sendMessage } from '../../../utils';

export function createVoiceTopicChannel(guildId, [channelId, content]) {
  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('createVoiceTopicChannel')
      .setLabel('Create Channel')
      .setStyle(ButtonStyle.Success),
  );

  sendMessage(channelId, content ?? '', true, null, false, [buttons]);
}
