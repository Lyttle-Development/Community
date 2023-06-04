import { openVoiceTopicModal } from '../../../Communication';
import { ButtonRoutes } from '../../../../types';
import {
  setBirthDayCorrectButton,
  setBirthDaySubmitButton,
} from '../../birth-day/set-birth-day-buttons';

/**
 * All routes for button presses
 * customId: Function
 */
export const buttonRoutes: ButtonRoutes = {
  openVoiceTopicModal: openVoiceTopicModal,
  setBirthDayButtonCorrect: setBirthDayCorrectButton,
  setBirthDayButtonSubmit: setBirthDaySubmitButton,
};
