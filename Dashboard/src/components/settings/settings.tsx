import { Component } from '@lyttledev-dashboard/components';
import styles from './settings.module.scss';
import { SettingCard } from '@lyttledev-dashboard/components/setting-card';
import { useEffect } from 'react';

export type CardSettings = SettingCard[];

export interface SettingsProps {
  settings: CardSettings;
}

export function Settings({ settings }: SettingsProps) {
  useEffect(() => {
    // Scroll to the anchor:
    const anchor = window.location.hash;
    if (anchor) {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <ul className={styles.settings}>
      {settings.map((setting, i) => (
        <li key={i} id={setting.id ?? ''}>
          <Component.SettingCard {...setting} />
        </li>
      ))}
    </ul>
  );
}
