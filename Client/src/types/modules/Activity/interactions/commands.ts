import { GuildMember } from '../../../app';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

/**
 * All routes/functions for command interactions interface
 */
export interface CommandRoutes {
  [key: string]: (
    guildMember: GuildMember,
    interaction: CommandInteraction,
  ) => void;
}

/**
 * A single command
 */
export type Command = Omit<
  SlashCommandBuilder,
  'addSubcommand' | 'addSubcommandGroup'
>;

/**
 * All commands, each command is a slash command
 */
export type Commands = Command[];
