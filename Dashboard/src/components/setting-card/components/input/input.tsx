import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { ChangeEvent } from 'react';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';
import styles from './input.module.scss';

export interface SettingCardInputItem {
  type: SettingCardSubItems.Input;
  key: string;
  value: string;
  variables: { variable: string; description: string }[];
  defaultKey: string;
  placeholder: string;
}

export interface SettingCardInputProps {
  item: SettingCardInputItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Input({ item, changes, change }: SettingCardInputProps) {
  const { key, value, variables, defaultKey, placeholder } = item;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    change(value, key, e.currentTarget.value);
  };

  return (
    <section className={styles.card}>
      <Component.Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        value={(changes[key] as string) ?? value}
        className={styles.input}
      />
      <article className={styles.options}>
        <Component.IconButton
          icon={IconButtonIcons.down}
          className={styles.retrieve}
        />
        {variables && variables.length > 0 && (
          <ul className={styles.variables}>
            {variables.map((variable, i) => (
              <li key={i}>
                <span className={styles['var-key']}>
                  {'{'}
                  {variable.variable}
                  {'}'}
                </span>
                <span className={styles['var-description']}>
                  {variable.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
