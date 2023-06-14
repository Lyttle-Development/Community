import { triggerBirthday } from '../../modules/Activity/birth-day/check-today-change';
import { checkNewDay } from './checks/daily';

export const checks = [checkNewDay];
export const dailyChecks = [triggerBirthday];
