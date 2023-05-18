import { GuildMember } from '../../../../types';
import { ModalSubmitInteraction } from 'discord.js';
import { modalRoutes } from './routes';

// Get all available routes
export const registeredModalInteractions: string[] = Object.keys(modalRoutes);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export async function routeModalSubmit(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
): Promise<void> {
  // Check if the route is available
  if (!registeredModalInteractions.includes(interaction.customId)) {
    await interaction.deferUpdate();
    return;
  }

  // Execute the route
  return modalRoutes[interaction.customId](guildMember, interaction);
}
