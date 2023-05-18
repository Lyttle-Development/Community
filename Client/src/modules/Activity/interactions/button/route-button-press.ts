import { GuildMember } from '../../../../types';
import { ButtonInteraction } from 'discord.js';
import { buttonRoutes } from './routes';

// Get all available routes
const availableRoutes: string[] = Object.keys(buttonRoutes);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export async function routeButtonPress(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
): Promise<void> {
  // Check if the route is available
  if (!availableRoutes.includes(interaction.customId)) {
    await interaction.deferUpdate();
    return;
  }

  // Execute the route
  return buttonRoutes[interaction.customId](guildMember, interaction);
}
