import { ModuleConfigGlobalVariables } from '../../../../Content';
import { getMonths } from './get-months';

export type monthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export async function getMonth(
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
  guildId: string,
  month: monthNumber,
) {
  const months: string[] = await getMonths(defaultVariables, guildId);
  return months[month];
}
