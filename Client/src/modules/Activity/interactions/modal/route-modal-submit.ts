import { GuildMember } from '../../../../types';
import { ModalSubmitInteraction } from 'discord.js';
import { createVoiceTopicChild } from '../../../Communication/voice-topics';

// All routes for button presses interface
interface ModalRoutes {
  [key: string]: (
    guildMember: GuildMember,
    interaction: ModalSubmitInteraction,
  ) => void;
}

/**
 * All routes for button presses
 * customId: Function
 */
const modalRoutes: ModalRoutes = {
  createVoiceTopicChild: createVoiceTopicChild,
};

// Get all available routes
const availableRoutes = Object.keys(modalRoutes);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export async function routeModalSubmit(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
) {
  // Check if the route is available
  if (!availableRoutes.includes(interaction.customId)) {
    await interaction.deferUpdate();
    return;
  }

  // Execute the route
  return modalRoutes[interaction.customId](guildMember, interaction);
}
