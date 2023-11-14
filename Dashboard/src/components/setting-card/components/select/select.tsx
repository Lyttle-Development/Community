import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks';
import { SelectMultiple } from '@lyttledev-dashboard/components/setting-card/components/select/components/multiple';
import { SelectSigle } from '@lyttledev-dashboard/components/setting-card/components/select/components/single';

export interface SettingCardSelectItemOptions {
  key: string | { title: string; description: string };
  value: string;
}

export interface SettingCardSelectItem {
  type: SettingCardSubItems.Select;
  key: string;
  value: string;
  values: string[];
  title: string;
  options: SettingCardSelectItemOptions[];
  single: boolean;
  flex?: boolean;
  description?: string;
}

export interface SettingCardSelectProps {
  item: SettingCardSelectItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Select({ item, changes, change }: SettingCardSelectProps) {
  return (
    <>
      {item.single ? (
        <SelectSigle item={item} changes={changes} change={change} />
      ) : (
        <SelectMultiple item={item} changes={changes} change={change} />
      )}
    </>
  );
}
