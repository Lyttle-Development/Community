import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';
import { getMessage } from '@lyttledev-dashboard/utils';
import { SettingCardSelectProps } from '@lyttledev-dashboard/components/setting-card/components/select';

const keyClear = 'Dashboard.components.setting-card.select';
const msgClear = getMessage(keyClear);

export function SelectSigle({ item, changes, change }: SettingCardSelectProps) {
  const {
    key,
    value: orgValue = '',
    values: orgValues = [],
    title,
    options,
  } = item;

  // Update value based on available values.
  const values = orgValues.length > 0 ? orgValues : [orgValue ?? ''];
  const value = orgValue ?? values[0] ?? '';

  const updateValue = (newValue: string) => {
    const JSONOptions = JSON.stringify(item.options);
    change(value, key, newValue, JSONOptions);
  };

  return (
    <Component.Select
      options={[
        { key: { title: '-', description: msgClear }, value: '' },
        ...options,
      ]}
      value={(changes[key]?.current as string) ?? value}
      label={title}
      onChange={updateValue}
      color={SelectColor.Yellow}
    />
  );
}
