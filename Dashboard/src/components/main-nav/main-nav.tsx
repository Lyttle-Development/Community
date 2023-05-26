import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { componentsPrefix } from '@lyttledev-dashboard/components/imports';
import { useEffect, useState } from 'react';

export function MainNav() {
  const app = useApp();
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const mainNavOpen = app?.mainNavOpen ?? false;
  const pfx = componentsPrefix + 'main-nav.label-';
  const labelDashboard = getMessage(pfx + 'dashboard');
  const labelHome = getMessage(pfx + 'home');
  const labelLogout = getMessage(pfx + 'logout');
  const labelMessages = getMessage(pfx + 'messages');
  const labelModules = getMessage(pfx + 'modules');
  const labelProfile = getMessage(pfx + 'profile');
  const labelStatistics = getMessage(pfx + 'statistics');

  const prefix = 'main-nav';
  const openClass = mainNavOpen
    ? `${prefix} ${prefix}--open`
    : `${prefix} ${prefix}--closed`;

  const signOut = () => {
    window.alert('Currently not implemented!');
  };

  // Update selected guild id
  useEffect(() => {
    // Get id
    const guildId = app?.selectedGuildId ?? null;
    // Check id against current id
    if (guildId === selectedGuildId) return;
    // Update id
    setSelectedGuildId(guildId);
  }, [app?.selectedGuildId, selectedGuildId, setSelectedGuildId]);

  return (
    <aside className={`${openClass} ${styles['main-menu']}`}>
      <Link href="/">
        <Component.Logo className={styles.logo} />
      </Link>
      <nav>
        <ul>
          <MainNavItem href={'/'}>{labelHome}</MainNavItem>
          <MainNavItem href={'/dashboard'}>{labelDashboard}</MainNavItem>
          {selectedGuildId && (
            <>
              <MainNavItem
                href={`/dashboard/${selectedGuildId}/modules`}
                route={'/dashboard/[id]/modules'}
              >
                {labelModules}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${selectedGuildId}/statistics`}
                route={'/dashboard/[id]/statistics'}
              >
                {labelStatistics}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${selectedGuildId}/messages`}
                route={'/dashboard/[id]/messages'}
              >
                {labelMessages}
              </MainNavItem>
            </>
          )}
          <MainNavItem href={'/profile'}>{labelProfile}</MainNavItem>
        </ul>
      </nav>
      <ul className={`${styles['main-menu__footer']}`}>
        <MainNavItem onClick={signOut}>{labelLogout}</MainNavItem>
      </ul>
    </aside>
  );
}
