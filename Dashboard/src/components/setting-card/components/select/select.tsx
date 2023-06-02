import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';

export interface SettingCardSelectItemOptions {
  key: string | { title: string; description: string };
  value: string;
}

export interface SettingCardSelectItem {
  type: SettingCardSubItems.Select;
  key: string;
  value: string;
  title: string;
  options: SettingCardSelectItemOptions[];
  single: boolean;
}

export interface SettingCardSelectProps {
  item: SettingCardSelectItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Select({ item, changes, change }: SettingCardSelectProps) {
  const { key, value, title, options, single = true } = item;

  // Define update function.
  const updateValue = (newValue: string) => change(value, key, newValue);
  return (
    <>
      <Component.Select
        options={options}
        value={(changes[key] as string) ?? value}
        label={title}
        onChange={updateValue}
        color={SelectColor.Yellow}
      ></Component.Select>
    </>
  );
}
