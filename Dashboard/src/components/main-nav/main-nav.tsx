import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logout } from '@lyttledev-dashboard/hooks/useAuth';

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
  const labelModules = getMessage(pfx + 'modules');
  // const labelProfile = getMessage(pfx + 'profile'); // TODO: Add profile
  const labelOverview = getMessage(pfx + 'overview');

  const prefix = 'main-nav';
  const openClass = mainNavOpen
    ? `${prefix} ${prefix}--open`
    : `${prefix} ${prefix}--closed`;

  const signOut = () => {
    app?.setSelectedGuildId(null);
    logout();
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
      const name = app?.selectedGuild?.name || null;

      if (!name) {
        setSelectedGuild({
          id: guildId,
          name: 'Last edited guild',
          avatar: '/media/images/placeholder.png',
          show: true,
        });
        return;
      }
      // Update id
      setSelectedGuild({
        id: guildId,
        name: app?.selectedGuild.name ?? '',
        avatar: app?.selectedGuild.icon ?? '',
        show: true,
      });
    }, 800);
  }, [app?.selectedGuild]);

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
            {/* // Currently disabled, will be added in the future! // */}
            {/* <MainNavItem href={'/profile'}>{labelProfile}</MainNavItem>*/}
          </ul>
          <article className={'main-nav__guild'}>
            <section
              className={`${styles.guild} ${
                (!selectedGuild.show || !selectedGuild?.avatar) && styles.hide
              } main-nav__guild__item`}
            >
              <Image
                className={styles.avatar}
                src={selectedGuild?.avatar || '/media/images/placeholder.png'}
                alt={`Avatar of server ${selectedGuild.name}.`}
                width={30}
                height={30}
              />
              <p className={styles.selected}>{selectedGuild.name}</p>
            </section>
            <ul
              className={`${styles['server-menu']} ${
                (selectedGuild.id === '0' || !selectedGuild?.avatar) &&
                styles.hide
              } server-menu`}
            >
              <MainNavItem
                href={`/dashboard/${selectedGuild.id}`}
                route={'/dashboard/[guild_id]'}
              >
                {labelOverview}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${selectedGuild.id}/modules`}
                route={'/dashboard/[guild_id]/modules'}
              >
                {labelModules}
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
