import styles from './header.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { Icons } from '@lyttledev-dashboard/components/icon';
import { Layout } from '@lyttledev-dashboard/layouts';

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
            icon={Icons.hamburger}
            className={styles.hamburger}
            onClick={onHamburgerClick}
          />
        )}
        <Layout.Transition>
          <h1 className={styles.title}>{title}</h1>
        </Layout.Transition>
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
