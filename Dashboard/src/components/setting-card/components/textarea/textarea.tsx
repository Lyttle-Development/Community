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
  flex?: boolean;
  title?: string;
}

export interface SettingCardTextareaProps {
  item: SettingCardTextareaItem;
  changes: Changes;
  change: SettingCardChange;
}

const keyDefault = 'Dashboard.components.setting-card.receive-default';
const msgDefault = getMessage(keyDefault);

export function Textarea({ item, changes, change }: SettingCardTextareaProps) {
  // Get item data.
  const { key, value, variables, defaultKey, title, flex } = item;

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
      <article className={styles.wrapper}>
        {title && <span>{title}</span>}
        <Component.Textarea
          placeholder={defaultMessage}
          onChange={handleChange}
          value={(changes[key]?.current as string) ?? value}
          className={styles.textarea}
        />
      </article>
      <article
        className={`${styles.options} ${
          !flex && title && styles['options__title']
        }`}
      >
        <div className={styles.default}>
          <Component.IconButton
            icon={IconButtonIcons.down}
            className={styles.retrieve}
            onClick={retrieveDefault}
            disabled={usingDefault}
          />
          <span>{msgDefault}</span>
        </div>
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
