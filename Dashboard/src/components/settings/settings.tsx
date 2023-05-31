import { Component } from '@lyttledev-dashboard/components';
import styles from './settings.module.scss';
import { SettingCardProps } from '@lyttledev-dashboard/components/setting-card';

export type CardSetting = SettingCardProps;
export type CardSettings = CardSetting[];

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
