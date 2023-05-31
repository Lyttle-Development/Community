import { Component } from '@lyttledev-dashboard/components';
import styles from './setting-card.module.scss';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { Change, useApp } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardComponents } from '@lyttledev-dashboard/components/setting-card/components';
import { SettingCardInputItem } from '@lyttledev-dashboard/components/setting-card/components/input';
import { SettingCardTextareaItem } from '@lyttledev-dashboard/components/setting-card/components/textarea';
import { SettingCardSelectItem } from '@lyttledev-dashboard/components/setting-card/components/select';

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

  const change: SettingCardChange = (
    initial: Change,
    key: string,
    value: Change,
  ) => {
    if (value === initial) {
      app?.removeChange(key);
      return;
    }
    app?.updateChange(key, value);
  };

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {enabled?.state !== undefined &&
          enabled?.key !== undefined &&
          id !== null && (
            <Component.LightSwitch
              active={(changes[enabled.key] as boolean) ?? enabled.state}
              onClick={(e) => change(enabled?.state, enabled?.key, e)}
              color={SCSSPrimaryColors.yellow}
              className={styles['switch']}
            />
          )}
      </div>
      <Component.Markdown className={styles.description}>
        {description}
      </Component.Markdown>
      {subItems && (
        <ul className={styles['sub-items']}>
          {subItems.length > 0 &&
            subItems.map((item: SettingCardSubItem, i) => (
              <li key={i}>
                {SettingCardComponents[item.type]({ item, changes, change })}
              </li>
            ))}
        </ul>
      )}
    </article>
  );
}
