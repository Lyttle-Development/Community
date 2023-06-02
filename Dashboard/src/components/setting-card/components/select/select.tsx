import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';
import { useEffect, useState } from 'react';
import styles from './select.module.scss';

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
  const [amount, setAmount] = useState(
    (changes[`${key}[1]`]?.store as number) ?? 1,
  );

  const more: string[] = [];
  for (let i = 1; i <= amount; i++) {
    more.push(`${key}[${i}]`);
  }

  useEffect(() => {
    if (single) return;
    const allValues = more.filter((k) => changes[k]?.current);
    if (allValues.length < amount) return;
    const newAmount = amount + 1;
    setAmount(newAmount);

    const oneKey = `${key}[1]`;
    const oneValue = changes[oneKey];
    if (!oneValue) return;
    change(oneValue.original, oneKey, oneValue.current, newAmount);
  }, [changes]);

  // Define update function.
  const updateValue = (newValue: string) => change(value, key, newValue);

  return (
    <>
      {single && (
        <Component.Select
          options={options}
          value={(changes[key]?.current as string) ?? value}
          label={title}
          onChange={updateValue}
          color={SelectColor.Yellow}
        />
      )}

      {!single && (
        <ul className={styles.more}>
          {more.map((moreKey, i) => (
            <Component.Select
              key={i}
              options={[{ key: '-', value: '' }, ...options]}
              value={(changes[moreKey]?.current as string) ?? value}
              label={title}
              onChange={(newValue) => {
                change('', moreKey, newValue);
              }}
              color={SelectColor.Yellow}
            />
          ))}
        </ul>
      )}
    </>
  );
}
