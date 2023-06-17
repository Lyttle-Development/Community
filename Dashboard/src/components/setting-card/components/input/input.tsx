import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { Component } from '@lyttledev-dashboard/components';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';
import styles from './input.module.scss';
import { ChangeEvent } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks';

export interface SettingCardInputItemVariables {
  variable: string;
  description: string;
}

export interface SettingCardInputItem {
  type: SettingCardSubItems.Input;
  key: string;
  defaultKey: string;
  value: string;
  variables: SettingCardInputItemVariables[];
}

export interface SettingCardInputProps {
  item: SettingCardInputItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Input({ item, changes, change }: SettingCardInputProps) {
  // Get item data.
  const { key, value, variables, defaultKey } = item;

  // Get default message.
  const defaultMessage = getMessage(defaultKey);

  // Define update function.
  const updateValue = (newValue: string) => change(value, key, newValue);

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event?.target?.value ?? '';
    updateValue(newValue);
  };

  // Handle retrieve default
  const retrieveDefault = () => {
    updateValue(defaultMessage);
  };

  // Check if using default
  const usingDefault = defaultMessage === (changes[key]?.current ?? value);

  // Render component.
  return (
    <section className={styles.card}>
      <Component.Input
        type="text"
        placeholder={defaultMessage}
        onChange={handleChange}
        value={(changes[key]?.current as string) ?? value}
        className={styles.input}
      />
      <article className={styles.options}>
        <Component.IconButton
          icon={IconButtonIcons.down}
          className={styles.retrieve}
          onClick={retrieveDefault}
          disabled={usingDefault}
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
