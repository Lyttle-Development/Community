import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';
import { useEffect, useState } from 'react';
import styles from './select.module.scss';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks';
import { getMessage } from '@lyttledev-dashboard/utils';

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

const keyClear = 'Dashboard.components.setting-card.select';
const msgClear = getMessage(keyClear);

export function Select({ item, changes, change }: SettingCardSelectProps) {
  const { key, value, values = [], title, options, single = true } = item;
  const [amount, setAmount] = useState(values.length + 1 ?? 1);

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
    const JSONOptions = JSON.stringify(item.options);
    change(oneValue.original, oneKey, oneValue.current, JSONOptions, newAmount);
  }, [changes]);

  // Define update function.
  const updateValue = (newValue: string) => {
    const JSONOptions = JSON.stringify(item.options);
    change(value, key, newValue, JSONOptions);
  };

  const allMoreValues = more.map((k) => changes[k]?.current);

  const ourChanges = more.map((k) => changes[k]?.current);
  const emptyChanges = ourChanges.filter((v) => !v);
  const ourOriginalChanges = more.map((k) => changes[k]?.original);
  const notUpdatedNormalValues = values.filter(
    (v) => !ourOriginalChanges.includes(v),
  );

  const selects = emptyChanges.length - notUpdatedNormalValues.length;
  if (selects < 1) {
    const newAmount = amount + 1;
    setAmount(newAmount);
  }

  const withEmptyOptions = options.filter(
    (option) =>
      ![...allMoreValues, ...notUpdatedNormalValues].includes(option.value),
  );

  return (
    <>
      {single && (
        <Component.Select
          options={[
            { key: { title: '-', description: msgClear }, value: '' },
            ...withEmptyOptions,
          ]}
          value={(changes[key]?.current as string) ?? value}
          label={title}
          onChange={updateValue}
          color={SelectColor.Yellow}
        />
      )}

      {!single && (
        <ul className={styles.more}>
          {more.map((moreKey, i) => (
            <li key={i}>
              <Component.Select
                options={[
                  { key: { title: '-', description: msgClear }, value: '' },
                  ...withEmptyOptions,
                  ...([
                    options.find(
                      (option) =>
                        option.value ===
                        (changes[moreKey]?.current ?? values[i] ?? ''),
                    ) ?? null,
                  ].filter(
                    (option) => option,
                  ) as SettingCardSelectItemOptions[]),
                ]}
                value={
                  (changes[moreKey]?.current as string) ??
                  (values.length > 0 ? values[i] : value) ??
                  ''
                }
                label={title}
                onChange={(newValue) => {
                  change(values[i] ?? '', moreKey, newValue);
                }}
                color={SelectColor.Yellow}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
