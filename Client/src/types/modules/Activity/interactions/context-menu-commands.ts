import { GuildMember } from '../../../app';
import { ContextMenuCommandInteraction } from 'discord.js';
import { contextMenuCommands } from '../../../../modules';

/**
 * All registered contextMenuCommands DATA
 */
type RegisteredContextMenuCommands =
  (typeof contextMenuCommands)[number]['commandName'];

/**
 * All routes/functions for contextMenuCommand interactions interface
 */
export type ContextMenuCommandRoutes = {
  [key in RegisteredContextMenuCommands]: (
    guildMember: GuildMember,
    interaction: ContextMenuCommandInteraction,
  ) => void;
};
