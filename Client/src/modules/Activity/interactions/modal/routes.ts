import { createVoiceTopicChild } from '../../../Communication';
import { ModalRoutes } from '../../../../types';
import { setBirthDayModal } from '../../birth-day/set-birth-day-modal';

/**
 * All routes for button presses
 * customId: Function
 */
export const modalRoutes: ModalRoutes = {
  createVoiceTopicChild: createVoiceTopicChild,
  setBirthDayModal: setBirthDayModal,
};
