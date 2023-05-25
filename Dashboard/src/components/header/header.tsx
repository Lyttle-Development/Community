import styles from './header.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';

export function Header() {
  const app = useApp();
  const homeTitle = getMessage(pagesPrefix + 'home.title');
  const title = app?.pageTitle ?? homeTitle;
  return (
    <Component.Container>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.navigation}>
          <Component.Search />
          <Component.Avatar />
        </section>
      </header>
    </Component.Container>
  );
}
