import { Component } from '@lyttledev-dashboard/components';
import { SelectColor } from '@lyttledev-dashboard/components/select';
import styles from '../select.module.scss';
import { getMessage } from '@lyttledev-dashboard/utils';
import {
  SettingCardSelectItemOptions,
  SettingCardSelectProps,
} from '@lyttledev-dashboard/components/setting-card/components/select';
import { useEffect, useState } from 'react';

const keyClear = 'Dashboard.components.setting-card.select';
const msgClear = getMessage(keyClear);

export function SelectMultiple({
  item,
  changes,
  change,
}: SettingCardSelectProps) {
  const [selects, setSelects] = useState<string[]>([]);

  const {
    key,
    value: orgValue = '',
    values: orgValues = [],
    title,
    newTitle = 'New ' + title,
    options,
  } = item;

  useEffect(() => {
    const newSelects = Object.keys(changes)
      .filter((k) => k.startsWith(`${item.key}/`))
      .map((k) => changes[k].current as string);

    const updatedSelects = Object.keys(changes)
      .filter((k) => k.startsWith(`${item.key}/`))
      .map((k) => changes[k].original as string);

    const newSelectsSet = [...new Set([...values, ...newSelects])];
    const newSelectsSetFiltered = newSelectsSet
      .filter((v) => v !== '')
      .filter((v) => !updatedSelects.includes(v));

    setSelects(newSelectsSetFiltered);
  }, [changes]);

  // Update value based on available values.
  const values = orgValues.length > 0 ? orgValues : [orgValue ?? ''];
  const value = orgValue ?? values[0] ?? '';

  const updateValue = (
    itemKey: string,
    previousValue: string,
    newValue: string,
  ) => {
    const JSONOptions = JSON.stringify(item.options);
    const initial =
      (changes[itemKey]?.original as string) ?? previousValue ?? '';

    const valueAlreadySaved = values.find((e) => e === newValue) ?? null;
    if (valueAlreadySaved) {
      change(newValue, getKey(valueAlreadySaved), newValue, JSONOptions);
      return;
    }

    change(initial, itemKey, newValue, JSONOptions);
  };

  const getKey = (k: string): string => {
    const res = Object.keys(changes) //
      .filter((c) => c.startsWith(`${item.key}/${k}`));
    if (res.length > 0) return res[0];
    return `${item.key}/${k}`;
  };

  // Options filtering:
  const notTakenOptions = //
    options.filter((option) => !selects.includes(option.value));
  const notChangedTakenOptions = //
    notTakenOptions.filter((option) => option.value !== value);

  // Get option back from filtered options.
  const findMyOption = (
    k: string,
    v: string,
  ): SettingCardSelectItemOptions[] => {
    const newValue = changes[k]?.current ?? v ?? '';
    return [
      // Find option by value & valid option. and return it.
      options.find((option) => option.value === newValue) ?? null,
    ].filter((option) => option) as SettingCardSelectItemOptions[];
  };

  return (
    <ul className={styles.more}>
      {selects.map((v, i) => {
        const valueKey = getKey(v);
        return (
          <li key={i}>
            <Component.Select
              options={[
                { key: { title: '-', description: msgClear }, value: '' },
                ...notChangedTakenOptions,
                ...(findMyOption(key, v) ?? []),
              ]}
              value={(changes[valueKey]?.current as string) ?? v ?? ''}
              label={title}
              onChange={(val) => updateValue(valueKey, v, val)}
              color={SelectColor.Yellow}
            />
          </li>
        );
      })}
      <li>
        <Component.Select
          options={[
            { key: { title: '-', description: msgClear }, value: '' },
            ...notChangedTakenOptions,
          ]}
          value={''}
          label={newTitle}
          onChange={(val) => updateValue(getKey(val), '', val)}
          color={SelectColor.Yellow}
          onlyOnChange={true}
        />
      </li>
    </ul>
  );
}
