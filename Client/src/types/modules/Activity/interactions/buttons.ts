import { GuildMember } from '../../../app';
import { ButtonInteraction } from 'discord.js';

/**
 * All routes/functions for button presses interface
 */
export interface ButtonRoutes {
  [key: string]: (
    guildMember: GuildMember,
    interaction: ButtonInteraction,
  ) => void;
}
