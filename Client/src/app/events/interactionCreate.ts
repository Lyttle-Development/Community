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

  // Check if the interaction is a DM
  if (!interaction?.guild) {
    // Check if we have a valid user
    if (!userId) return;

    if (interaction.isButton()) {
      return onPrivateInteractionButton(userId, interaction);
    }

    if (interaction.isCommand()) {
      return onPrivateInteractionCommand(userId, interaction);
    }

    if (interaction.isModalSubmit()) {
      return onPrivateInteractionModalSubmit(userId, interaction);
    }
  }

  // Check if the interaction is a guild
  if (interaction.inGuild()) {
    // Build the guildMember
    const guildMember: GuildMember = {
      guildId: interaction?.guild?.id,
      userId,
    };

    // Check if we have a valid guildMember
    if (!guildMember?.guildId || !guildMember?.userId) return;

    if (interaction.isButton()) {
      return onGuildInteractionButton(guildMember, interaction);
    }

    if (interaction.isCommand()) {
      return onGuildInteractionCommand(guildMember, interaction);
    }

    if (interaction.isModalSubmit()) {
      return onGuildInteractionModalSubmit(guildMember, interaction);
    }
  }
}

export default interactionCreate;
