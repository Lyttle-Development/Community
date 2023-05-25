import styles from './header.module.scss';
import { Component } from '@lyttledev-dashboard/components';

export function Header() {
  return (
    <Component.Container>
      <header className={styles.header}>
        <Component.Search></Component.Search>
      </header>
    </Component.Container>
  );
}
