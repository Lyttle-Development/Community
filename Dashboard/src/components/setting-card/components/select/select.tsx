import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';

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
  return (
    <>
      <Component.Select
        options={options}
        value={value}
        label={title}
        onChange={(newValue) => console.log(newValue)}
        color={SelectColor.Yellow}
      ></Component.Select>
    </>
  );
}
