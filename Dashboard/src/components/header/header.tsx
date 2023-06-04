import styles from './header.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';

export interface HeaderProps {
  mobile: boolean;
}

export function Header({ mobile }: HeaderProps) {
  const app = useApp();
  const homeTitle = getMessage(pagesPrefix + 'home.title');
  const title = app?.pageTitle ?? homeTitle;

  const onHamburgerClick = () => {
    app?.setMainNavOpen(true);
  };

  return (
    <Component.Container>
      <header className={styles.header}>
        {mobile && (
          <Component.IconButton
            icon={IconButtonIcons.hamburger}
            className={styles.hamburger}
            onClick={onHamburgerClick}
          />
        )}
        <h1 className={styles.title}>{title}</h1>
        <section
          className={`${styles.navigation} ${mobile ? styles.hide : ''}`}
        >
          <Component.Search />
          <Component.Avatar />
        </section>
      </header>
    </Component.Container>
  );
}
