import { Component } from '@lyttledev-dashboard/components';
import styles from './setting-card.module.scss';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardComponents } from '@lyttledev-dashboard/components/setting-card/components';
import { SettingCardInputItem } from '@lyttledev-dashboard/components/setting-card/components/input';
import { SettingCardTextareaItem } from '@lyttledev-dashboard/components/setting-card/components/textarea';
import { SettingCardSelectItem } from '@lyttledev-dashboard/components/setting-card/components/select';
import { useEffect, useState } from 'react';
import { Change } from '@lyttledev-dashboard/contexts/app-hooks';

export type SettingCardSubItem =
  | SettingCardTextareaItem
  | SettingCardInputItem
  | SettingCardSelectItem;

export interface SettingCard {
  id: string | null;
  title: string;
  description: string;
  enabled?: { state: boolean; key: string };
  subItems?: SettingCardSubItem[];
}

type SettingCardProps = SettingCard;

export type SettingCardChange = (
  initial: Change,
  key: string,
  value: Change,
  store?: Change,
  amount?: Change,
) => void;

export function SettingCard({
  id,
  title,
  description,
  enabled,
  subItems,
}: SettingCardProps) {
  const app = useApp();
  const changes = app?.changes ?? {};
  const [hidden, setHidden] = useState(false);

  const change: SettingCardChange = (
    initial: Change,
    key: string,
    value: Change,
    store = null,
  ) => {
    app?.change({
      update: {
        key,
        value,
        initial,
        store,
      },
    });
  };

  const changeEnabled = (state: boolean) => {
    // If the enabled state is not defined, return
    if (!enabled) return;

    // Check if the state is disabled / false.
    if (!state) {
      // Get sub items keys
      const subItemKeys = subItems?.map((item) => item.key) ?? [];

      // Get extra sub items keys
      const extraSubItemKeys = subItemKeys.map((key) =>
        changes[`${key}[1]`]?.store ? key : null,
      );
      const extraSubItemKeysItems = [];
      for (const key of extraSubItemKeys) {
        if (key !== null) {
          const subKey = changes[`${key}[1]`];
          if (typeof subKey.store === 'number') {
            for (let i = 1; i <= subKey.store; i++) {
              extraSubItemKeysItems.push(`${key}[${i}]`);
            }
          }
        }
      }

      // Combine all sub items keys
      const allSubItemKeys = [...subItemKeys, ...extraSubItemKeysItems];

      // Check if the enabled state is the same as the state we are trying to set
      const deleteEnabled = enabled.state === state;

      // If we are trying to delete the enabled state, remove the enabled key and all sub items
      if (deleteEnabled) {
        app?.change({ remove: [enabled.key, ...allSubItemKeys] });
        return;
      }
      // If we are trying to set the enabled state, remove all sub items and update the enabled key
      app?.change({
        remove: allSubItemKeys,
        update: { key: enabled.key, value: state, initial: enabled.state },
      });
      return;
    }
    // Set the enabled state
    app?.change({
      update: {
        key: enabled.key,
        value: state,
        initial: enabled.state,
      },
    });
  };

  const isEnabled =
    // Get from changes
    (enabled && (changes[enabled?.key]?.current as boolean)) ??
    // Get from store
    enabled?.state ??
    // Default to true
    true;

  useEffect(() => {
    if (isEnabled) {
      const timeout = setTimeout(() => {
        setHidden(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }

    setHidden(true);
  }, [changes]);

  const flex = subItems?.some((item) => item.flex) ?? false;
  const nonFlexSubItems = subItems?.filter((item) => !item.flex) ?? [];
  const flexSubItems = subItems?.filter((item) => item.flex) ?? [];

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {enabled?.state !== undefined &&
          enabled?.key !== undefined &&
          id !== null && (
            <Component.LightSwitch
              active={
                (changes[enabled.key]?.current as boolean) ?? enabled.state
              }
              onClick={changeEnabled}
              color={SCSSPrimaryColors.yellow}
              className={styles['switch']}
            />
          )}
      </div>
      <Component.Markdown className={styles.description}>
        {description}
      </Component.Markdown>
      {nonFlexSubItems && nonFlexSubItems.length > 0 && (
        <ul
          className={`${styles['sub-items']} ${
            isEnabled && styles['sub-items--enabled']
          } ${hidden && styles['sub-items--hidden']}`}
        >
          {nonFlexSubItems.length > 0 &&
            nonFlexSubItems.map((item: SettingCardSubItem, i) => (
              <li key={i}>
                {SettingCardComponents[item.type]({ item, changes, change })}
              </li>
            ))}
        </ul>
      )}
      {flexSubItems && flexSubItems.length > 0 && (
        <ul
          className={`${styles['sub-items']} ${
            isEnabled && styles['sub-items--enabled']
          } ${hidden && styles['sub-items--hidden']} ${flex && styles['flex']}`}
        >
          {flexSubItems.length > 0 &&
            flexSubItems.map((item: SettingCardSubItem, i) => (
              <li key={i}>
                {SettingCardComponents[item.type]({ item, changes, change })}
              </li>
            ))}
        </ul>
      )}
    </article>
  );
}
