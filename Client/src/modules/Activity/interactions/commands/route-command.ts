import { GuildMember } from '../../../../types';
import { CommandInteraction } from 'discord.js';
import { commandRoutes } from './routes';

// Get all available routes
const availableRoutes: string[] = Object.keys(commandRoutes);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export async function routeCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
): Promise<void> {
  // Check if the route is available
  if (!availableRoutes.includes(interaction.commandName)) {
    // Todo: Send error message
    return;
  }

  // Execute the route
  return commandRoutes[interaction.commandName](guildMember, interaction);
}
