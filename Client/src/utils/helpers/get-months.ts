import {
  getModuleMarkdownContent,
  ModuleConfigGlobalMonths,
  ModuleConfigGlobalVariables,
} from '../../../../Content';
import { getMessage } from '../get-message';

const contentKey = 'Global.months';

export async function getMonths(
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
  guildId: string,
): Promise<string[]> {
  const guildMonthContent =
    (await getMessage<ModuleConfigGlobalMonths.Variables>(
      guildId,
      contentKey,
      defaultVariables,
    )) ?? '';

  const defaultMonthsContent = getModuleMarkdownContent(contentKey);

  const defaultMonths = defaultMonthsContent.split('\n');
  if (defaultMonths.length !== 12) {
    throw new Error('Invalid default months content');
  }

  const guildMonths = guildMonthContent.split('\n') || [];
  const months = [...defaultMonths];
  for (const [index, month] of guildMonths.entries()) {
    if (month) {
      months[index] = month;
    }
  }

  if (months.length !== 12) {
    throw new Error('Invalid default months content');
  }

  return months;
}
