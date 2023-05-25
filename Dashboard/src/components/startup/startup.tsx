import styles from './startup.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect, useState } from 'react';

export function Startup() {
  const app = useApp();
  const setMainNavOpen = app?.setMainNavOpen ?? ((x) => x);
  const [hide, setHide] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Start startup animation
  useEffect(() => {
    // Open the main nav after 700ms
    setTimeout(() => {
      setMainNavOpen(true);
    }, 700);

    // Close startup logo after 1 second
    setTimeout(() => {
      setHide(true);
    }, 1000);

    // Hide startup logo after 1.6 seconds
    setTimeout(() => {
      setHidden(true);
    }, 1600);
  }, []);

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
