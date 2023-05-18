import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, GuildMember } from '../../../types';

export const getLevelsCommandData: Command = new SlashCommandBuilder()
  .setName('xp')
  .setDescription('Get yours and others level information')
  .addUserOption((option) =>
    option
      .setName('member')
      .setDescription('Add one other member')
      .setRequired(false),
  )
  .addUserOption((option) =>
    option
      .setName('other-member')
      .setDescription('Add 2 members to check against')
      .setRequired(false),
  );

export function getLevelsCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
) {
  console.log('heye!');
  return;
}
