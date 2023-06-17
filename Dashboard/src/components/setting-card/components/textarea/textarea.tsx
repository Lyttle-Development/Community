import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { ChangeEvent } from 'react';
import { Component } from '@lyttledev-dashboard/components';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';
import styles from './textarea.module.scss';
import { getMessage } from '@lyttledev-dashboard/utils';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks';

export interface SettingCardTextareaItemVariables {
  variable: string;
  description: string;
}

export interface SettingCardTextareaItem {
  type: SettingCardSubItems.Textarea;
  key: string;
  defaultKey: string;
  value: string;
  variables: SettingCardTextareaItemVariables[];
}

export interface SettingCardTextareaProps {
  item: SettingCardTextareaItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Textarea({ item, changes, change }: SettingCardTextareaProps) {
  // Get item data.
  const { key, value, variables, defaultKey } = item;

  // Get default message.
  const defaultMessage = getMessage(defaultKey);

  // Define update function.
  const updateValue = (newValue: string) => change(value, key, newValue);

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      <Component.Textarea
        placeholder={defaultMessage}
        onChange={handleChange}
        value={(changes[key]?.current as string) ?? value}
        className={styles.textarea}
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
