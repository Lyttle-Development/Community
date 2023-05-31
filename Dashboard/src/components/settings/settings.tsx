import { Component } from '@lyttledev-dashboard/components';
import styles from './settings.module.scss';
import { SettingCard } from '@lyttledev-dashboard/components/setting-card';

export type CardSettings = SettingCard[];

export interface SettingsProps {
  settings: CardSettings;
}

export function Settings({ settings }: SettingsProps) {
  return (
    <ul className={styles.settings}>
      {settings.map((setting, i) => (
        <li key={i}>
          <Component.SettingCard {...setting} />
        </li>
      ))}
    </ul>
  );
}
