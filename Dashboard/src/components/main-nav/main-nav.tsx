import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SelectedGuild {
  id: string;
  name: string;
  avatar: string;
  show: boolean;
}

const emptySelectedGuild: SelectedGuild = {
  id: '0',
  name: 'Loading...',
  avatar: '/media/images/placeholder.png',
  show: false,
} as const;

export interface MainNavProps {
  mobile: boolean;
}

export function MainNav({ mobile }: MainNavProps) {
  const app = useApp();
  const [selectedGuild, setSelectedGuild] =
    useState<SelectedGuild>(emptySelectedGuild);
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
    // Todo: Add logout functionality
    window.alert('Currently not implemented!');
  };

  // Update selected guild id
  useEffect(() => {
    // Get id
    const guildId = app?.selectedGuildId ?? null;
    // Check id against current id
    if (guildId === selectedGuild?.id) return;
    if (typeof guildId !== 'string') return;
    setSelectedGuild({ ...selectedGuild, show: false });

    setTimeout(() => {
      // Update id
      setSelectedGuild({
        id: guildId,
        name: 'Lyttle Dev',
        avatar: '/media/images/placeholder.png',
        show: true,
      });
    }, 800);
  }, [app?.selectedGuildId]);

  const closeMenu = () => {
    app?.setMainNavOpen(false);
  };

  return (
    <>
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
          <article>
            <section
              className={`${styles.guild} ${
                !selectedGuild.show && styles.hide
              }`}
            >
              <Image
                className={styles.avatar}
                src={selectedGuild.avatar}
                alt={`Avatar of server ${selectedGuild.name}.`}
                width={30}
                height={30}
              />
              <p>{selectedGuild.name}</p>
            </section>
            <ul
              className={`${styles['server-menu']} ${
                selectedGuild.id === '0' && styles.hide
              }`}
            >
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
          </article>
        </nav>
        <ul className={`${styles['main-menu__footer']}`}>
          <MainNavItem onClick={signOut}>{labelLogout}</MainNavItem>
        </ul>
      </aside>
      {mobile && (
        <button
          onClick={closeMenu}
          className={`${styles.closer} ${mainNavOpen && styles.open}`}
        >
          Click to close!
        </button>
      )}
    </>
  );
}
