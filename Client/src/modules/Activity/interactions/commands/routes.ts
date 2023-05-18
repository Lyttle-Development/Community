import { getLevelsCommand } from '../../levels';
import { CommandRoutes } from '../../../../types';

/**
 * All routes for button presses
 * customId: Function
 */
export const commandRoutes: CommandRoutes = {
  xp: getLevelsCommand,
};
