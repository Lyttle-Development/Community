import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { componentsPrefix } from '@lyttledev-dashboard/components/imports';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SelectedGuild {
  id: string;
  name: string;
  avatar: string;
}

export function MainNav() {
  const app = useApp();
  const [selectedGuild, setSelectedGuild] = useState<SelectedGuild | null>(
    null,
  );
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
    if (guildId === selectedGuild?.id) return;
    if (typeof guildId !== 'string') return;
    // Update id
    setSelectedGuild({
      id: guildId,
      name: 'Lyttle Dev',
      avatar: '/media/images/placeholder.png',
    });
  }, [app?.selectedGuildId, selectedGuild, setSelectedGuild]);

  return (
    <aside className={`${openClass} ${styles['main-menu']}`}>
      <Link href="/">
        <Component.Logo className={styles.logo} />
      </Link>
      <nav>
        <ul>
          <MainNavItem href={'/'}>{labelHome}</MainNavItem>
          <MainNavItem href={'/dashboard'}>{labelDashboard}</MainNavItem>
          <MainNavItem href={'/profile'}>{labelProfile}</MainNavItem>
        </ul>
        {selectedGuild && (
          <>
            <section>
              <Image
                className={styles.avatar}
                src={selectedGuild.avatar}
                alt={`Avatar of server ${selectedGuild.name}.`}
                width={30}
                height={30}
              />
              <p>{selectedGuild.name}</p>
            </section>
            <ul className={styles['server-menu']}>
              <MainNavItem
                href={`/dashboard/${selectedGuild.id}/modules`}
                route={'/dashboard/[id]/modules'}
              >
                {labelModules}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${selectedGuild.id}/statistics`}
                route={'/dashboard/[id]/statistics'}
              >
                {labelStatistics}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${selectedGuild.id}/messages`}
                route={'/dashboard/[id]/messages'}
              >
                {labelMessages}
              </MainNavItem>
            </ul>
          </>
        )}
      </nav>
      <ul className={`${styles['main-menu__footer']}`}>
        <MainNavItem onClick={signOut}>{labelLogout}</MainNavItem>
      </ul>
    </aside>
  );
}
