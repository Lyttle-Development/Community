import { GuildMember } from '../../../types';
import { ButtonInteraction } from 'discord.js';

export async function createVoiceTopicChannelChild(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
) {
  await interaction.deferUpdate();
}
