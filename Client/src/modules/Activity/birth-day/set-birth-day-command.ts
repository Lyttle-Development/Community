import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, GuildMember } from '../../../types';

/**
 * The command name
 * !! Not typed, so we can detect the command name !!
 */
export const commandName = 'setbday' as const;

/**
 * The command data for the command
 */
export const commandData: Command = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription('Sets your own birthday, so no one forgets!');

/**
 * The command data with the command name.
 * !! Not typed, so we can detect the command name !!
 */
export const setBirthDayCommandData = {
  commandName,
  commandData,
} as const;

/**
 * The command function
 * Run when the command is used
 * @param guildMember
 * @param interaction
 */
export async function setBirthDayCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  return;
}
