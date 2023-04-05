import { Interaction } from 'discord.js';
import { GuildMember } from '../../types';
import {
  onGuildInteractionButton,
  onGuildInteractionCommand,
  onGuildInteractionModalSubmit,
  onPrivateInteractionButton,
  onPrivateInteractionCommand,
  onPrivateInteractionModalSubmit,
} from '../actions';

async function interactionCreate(interaction: Interaction): Promise<void> {
  // Ignore bots
  if (interaction?.user?.bot) return;

  // Get the user id
  const userId = interaction?.user?.id;
  const inGuild = !!interaction?.guild ?? interaction?.inGuild() ?? false;

  // Check if the interaction is a DM
  if (!inGuild) {
    // Check if we have a valid user
    if (!userId) return;

    // Check if the interaction is a button
    if (interaction.isButton()) {
      return onPrivateInteractionButton(userId, interaction);
    }

    // Check if the interaction is a command
    if (interaction.isCommand()) {
      return onPrivateInteractionCommand(userId, interaction);
    }

    // Check if the interaction is a modal submit
    if (interaction.isModalSubmit()) {
      return onPrivateInteractionModalSubmit(userId, interaction);
    }
  }

  // Check if the interaction is a guild
  if (inGuild) {
    // Build the guildMember
    const guildMember: GuildMember = {
      guildId: interaction?.guild?.id,
      userId,
    };

    // Check if we have a valid guildMember
    if (!guildMember?.guildId || !guildMember?.userId) return;

    // Check if the interaction is a button
    if (interaction.isButton()) {
      return onGuildInteractionButton(guildMember, interaction);
    }

    // Check if the interaction is a command
    if (interaction.isCommand()) {
      return onGuildInteractionCommand(guildMember, interaction);
    }

    // Check if the interaction is a modal submit
    if (interaction.isModalSubmit()) {
      return onGuildInteractionModalSubmit(guildMember, interaction);
    }
  }
}

export default interactionCreate;
