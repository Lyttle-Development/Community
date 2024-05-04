import styles from './main-nav.module.scss';
import { MainNavItem } from '@lyttledev-dashboard/components/main-nav-item';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import Link from 'next/link';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@lyttledev-dashboard/hooks/useUser';

interface SelectedGuild {
  id: string;
  name: string;
  avatar: string;
  show: boolean;
  template: boolean;
}

const emptySelectedGuild: SelectedGuild = {
  id: '0',
  name: 'Loading...',
  avatar: '/media/images/placeholder.png',
  show: true,
  template: true,
} as const;

export interface MainNavProps {
  mobile: boolean;
}

export function MainNav({ mobile }: MainNavProps) {
  const app = useApp();
  const selectedUser = useUser();
  const [selectedGuild, setSelectedGuild] =
    useState<SelectedGuild>(emptySelectedGuild);
  const mainNavOpen = app?.mainNavOpen ?? false;
  const pfx = componentsPrefix + 'main-nav.label-';
  const labelDashboard = getMessage(pfx + 'dashboard');
  const labelHome = getMessage(pfx + 'home');
  const labelLogin = getMessage(pfx + 'login');
  const labelLogout = getMessage(pfx + 'logout');
  const labelModules = getMessage(pfx + 'modules');
  const labelProfile = getMessage(pfx + 'profile');
  // const labelProfile = getMessage(pfx + 'profile'); // TODO: Add profile
  const labelOverview = getMessage(pfx + 'overview');

  const prefix = 'main-nav';
  const openClass = mainNavOpen
    ? `${prefix} ${prefix}--open`
    : `${prefix} ${prefix}--closed`;

  // Update selected guild id
  useEffect(() => {
    // Get id
    const guildId = app?.selectedGuildId ?? null;
    // Check id against current id
    if (guildId === selectedGuild?.id && !selectedGuild?.template) return;
    if (typeof guildId !== 'string') return;
    setSelectedGuild({ ...selectedGuild, show: false });

    setTimeout(() => {
      setSelectedGuild({
        id: guildId,
        name: app?.selectedGuild?.name || emptySelectedGuild.name,
        avatar: app?.selectedGuild?.icon || emptySelectedGuild.avatar,
        show: true,
        template: !(app?.selectedGuild?.name || app?.selectedGuild?.icon),
      });
    }, 800);
  }, [app?.selectedGuild, app?.selectedGuildId, app?.selectedGuild?.name]);

  const closeMenu = () => {
    app?.setMainNavOpen(false);
  };

  const realGuildId = app?.selectedGuildId ?? null;

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
          <article className={'main-nav__profile'}>
            <section
              className={`${styles.profile} main-nav__profile__item ${
                (!selectedUser || !selectedUser?.id) && styles.hide
              }`}
            >
              <Image
                className={styles.avatar}
                src={
                  selectedUser?.avatar
                    ? 'https://cdn.discordapp.com/avatars/' +
                      selectedUser?.id +
                      '/' +
                      selectedUser?.avatar
                    : '/media/images/placeholder.png'
                }
                alt={`Avatar of server ${selectedUser?.username}.`}
                width={30}
                height={30}
              />
              <p className={styles.selected}>{selectedUser?.global_name}</p>
            </section>
            <ul
              className={`${styles['user-menu']} profile-menu ${
                !selectedUser && styles.hide
              }`}
            >
              <MainNavItem href={'/profile'} route={'/profile'}>
                {labelProfile}
              </MainNavItem>
            </ul>
          </article>
          <article className={'main-nav__guild'}>
            <section
              className={`${styles.guild} ${
                (!selectedGuild ||
                  !selectedGuild?.show ||
                  selectedGuild?.id === '0' ||
                  selectedGuild?.id === 'null' ||
                  !selectedGuild?.id ||
                  !selectedGuild?.avatar ||
                  !selectedUser) &&
                styles.hide
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
                (!selectedGuild ||
                  !selectedGuild?.show ||
                  selectedGuild?.template ||
                  selectedGuild?.id === '0' ||
                  selectedGuild?.id === 'null' ||
                  !selectedGuild?.id ||
                  !selectedGuild?.avatar ||
                  !selectedUser) &&
                styles.hide
              } server-menu`}
            >
              <MainNavItem
                href={`/dashboard/${realGuildId}`}
                route={'/dashboard/[guild_id]'}
              >
                {labelOverview}
              </MainNavItem>
              <MainNavItem
                href={`/dashboard/${realGuildId}/modules`}
                route={'/dashboard/[guild_id]/modules'}
              >
                {labelModules}
              </MainNavItem>
            </ul>
          </article>
        </nav>
        <ul className={`${styles['main-menu__footer']}`}>
          {!selectedUser || !selectedUser?.id ? (
            <MainNavItem href={'/login'} route={'/login'}>
              {labelLogin}
            </MainNavItem>
          ) : (
            <MainNavItem href={'/logout'} route={'/logout'}>
              {labelLogout}
            </MainNavItem>
          )}
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
