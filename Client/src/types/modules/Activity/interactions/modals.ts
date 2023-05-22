import { GuildMember } from '../../../app';
import { ModalSubmitInteraction } from 'discord.js';

/**
 * All routes/functions for modal submits interface
 */
export interface ModalRoutes {
  [key: string]: (
    guildMember: GuildMember,
    interaction: ModalSubmitInteraction,
  ) => void;
}
