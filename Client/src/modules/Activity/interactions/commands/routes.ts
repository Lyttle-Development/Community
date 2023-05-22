import { getLevelsCommand } from '../../levels';
import { CommandRoutes } from '../../../../types';
import { setBirthDayCommand } from '../../birth-day';

/**
 * All routes for button presses
 * customId: Function
 */
export const commandRoutes: CommandRoutes = {
  xp: getLevelsCommand,
  setbday: setBirthDayCommand,
};
