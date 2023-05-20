import { getLevelsCommandData } from '../../levels';
import { setBirthDayCommandData } from '../../birth-day';

/**
 * All registered commands DATA
 * !! Not typed, so we can detect the command name !!
 */
export const commands = [getLevelsCommandData, setBirthDayCommandData] as const;
