import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';

export interface SettingCardSelectItem {
  type: SettingCardSubItems.Select;
  key: string;
  value: string;
  title: string;
  options: { key: string; value: string }[];
  single: boolean;
}

export interface SettingCardSelectProps {
  item: SettingCardSelectItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Select({ item, changes, change }: SettingCardSelectProps) {
  const { key, value, title, options, single = true } = item;
  return <>Hi!</>;
}
