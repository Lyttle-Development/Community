import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

export function MainNav() {
  const app = useApp();
  const selectedGuildId = app?.selectedGuildId ?? null;
  const mainNavOpen = app?.mainNavOpen ?? false;

  const prefix = 'main-nav';
  const openClass = mainNavOpen
    ? `${prefix} ${prefix}--open`
    : `${prefix} ${prefix}--closed`;

  const signOut = () => {
    window.alert('Currently not implemented!');
  };

  return (
    <aside className={`${openClass} ${styles['main-menu']}`}>
      <Link href="/">
        <Component.Logo className={styles.logo} />
      </Link>
      <nav>
        <ul>
          <MainNavItem href={'/'}>Home</MainNavItem>
          <MainNavItem href={'/dashboard'}>Servers</MainNavItem>
          {selectedGuildId && (
            <>
              <MainNavItem href={`/dashboard/${selectedGuildId}/modules`}>
                Modules
              </MainNavItem>
              <MainNavItem href={`/dashboard/${selectedGuildId}/statistics`}>
                Statistics
              </MainNavItem>
              <MainNavItem href={`/dashboard/${selectedGuildId}/messages`}>
                Messages
              </MainNavItem>
            </>
          )}
          <MainNavItem href={'/profile'}>Profile</MainNavItem>
        </ul>
      </nav>
      <ul className={`${styles['main-menu__footer']}`}>
        <MainNavItem onClick={signOut}>Logout</MainNavItem>
      </ul>
    </aside>
  );
}
