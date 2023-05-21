import { getMemberLevelsApp, getOthersLevelsApp } from '../../levels';
import { ContextMenuCommandRoutes } from '../../../../types';

/**
 * All routes for button presses
 * customId: Function
 */
export const contextMenuCommandRoutes: ContextMenuCommandRoutes = {
  'Get points': getMemberLevelsApp,
  'Compare points': getOthersLevelsApp,
};
