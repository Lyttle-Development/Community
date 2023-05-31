import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';

export interface SettingCardTextareaItem {
  type: SettingCardSubItems.Textarea;
  key: string;
  value: string;
  variables: { variable: string; description: string }[];
  defaultKey: string;
  placeholder: string;
}

export interface SettingCardTextareaProps {
  item: SettingCardTextareaItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Textarea({ item, changes, change }: SettingCardTextareaProps) {
  const { key, value, variables, defaultKey, placeholder } = item;
  return <>Hi!</>;
}
