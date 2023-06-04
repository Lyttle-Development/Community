import { getMemberLevelsAppData, getOthersLevelsAppData } from '../../levels';

/**
 * All registered commands DATA
 * !! Not typed, so we can detect the command name !!
 */
export const contextMenuCommands = [
  getMemberLevelsAppData,
  getOthersLevelsAppData,
] as const;
