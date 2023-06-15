import { triggerBirthday } from '../../modules/Activity/birth-day/check-today-change';
import { triggerDailyStats } from '../../modules';
import { checkNewDay } from './check-types/daily';

export const checks = [checkNewDay];
export const dailyChecks = [triggerBirthday, triggerDailyStats];
