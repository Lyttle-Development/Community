import { GuildMember } from '../../../../types';
import { ButtonInteraction } from 'discord.js';
import { createVoiceTopicChannelChild } from '../../voice-topics';

// All routes for button presses interface
interface ButtonRoutes {
  [key: string]: (
    guildMember: GuildMember,
    interaction: ButtonInteraction,
  ) => void;
}

/**
 * All routes for button presses
 * customId: Function
 */
const buttonRoutes: ButtonRoutes = {
  createVoiceTopicChannel: createVoiceTopicChannelChild,
};

// Get all available routes
const availableRoutes = Object.keys(buttonRoutes);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export async function routeButtonPress(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
) {
  // Check if the route is available
  if (!availableRoutes.includes(interaction.customId)) {
    await interaction.deferUpdate();
    return;
  }

  // Execute the route
  return buttonRoutes[interaction.customId](guildMember, interaction);
}
