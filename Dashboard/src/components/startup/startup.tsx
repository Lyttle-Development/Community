import styles from './startup.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect, useState } from 'react';
import { useStartup } from '@lyttledev-dashboard/contexts/app-hooks';

export interface StartupProps {
  mobile: boolean;
}

export function Startup({ mobile }: StartupProps) {
  const startup = useStartup();

  const app = useApp();
  const setMainNavOpen = app?.setMainNavOpen ?? ((x) => x);
  const [hide, setHide] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Start startup animation
  useEffect(() => {
    if (startup === null) return;
    if (!startup) {
      setHide(true);
      setHidden(true);
      if (mobile) return;
      setMainNavOpen(true);
      return;
    }

    const base = 1500;
    // Open the main nav after 700ms
    setTimeout(() => {
      if (mobile) return;
      setMainNavOpen(true);
    }, base - 300);

    // Close startup logo after 1 second
    setTimeout(() => {
      setHide(true);
    }, base);

    // Hide startup logo after 1.6 seconds
    setTimeout(() => {
      setHidden(true);
    }, base + 600);
  }, [startup]);

  return (
    <>
      {!hidden && (
        <div
          className={`${styles.startup} ${hide && styles.hide} ${
            hidden && styles.hidden
          }`}
        >
          <Component.Logo className={styles.img} />
        </div>
      )}
    </>
  );
}
