import { GuildMember } from '../../../../types';
import { ContextMenuCommandInteraction } from 'discord.js';
import { contextMenuCommandRoutes } from './routes';

// Get all available routes
export const registeredContextMenuCommandInteractions: string[] = Object.keys(
  contextMenuCommandRoutes,
);

/**
 * Route button presses
 * @param guildMember
 * @param interaction
 */
export function routeContextMenuCommand(
  guildMember: GuildMember,
  interaction: ContextMenuCommandInteraction,
): Promise<void> {
  // Check if the route is available
  if (
    !registeredContextMenuCommandInteractions.includes(interaction.commandName)
  ) {
    // Todo: Send error message
    return;
  }

  // Execute the route
  return contextMenuCommandRoutes[interaction.commandName](
    guildMember,
    interaction,
  );
}
