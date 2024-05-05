import { Component } from '@lyttledev-dashboard/components';
import { Layout } from '@lyttledev-dashboard/layouts';
import React, { useEffect } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import styles from './default.module.scss';
import { useRouter } from 'next/router';
import { useStartup } from '@lyttledev-dashboard/contexts/app-hooks';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  const startup = useStartup();
  const app = useApp();
  const mainNavOpen = app?.mainNavOpen ?? false;
  const mobile = app?.mobile ?? true;
  const router = useRouter();
  const snackbarActive = Object.keys(app?.changes ?? {}).length > 0;

  useEffect(() => {
    if (!mobile) return;
    app?.setMainNavOpen(false);
  }, [router.route]);

  if (startup === null) return <></>;

  return (
    <Layout.Base>
      <Component.Startup mobile={mobile} />
      <div
        className={`default-layout ${mainNavOpen ? 'main-nav--open' : ''} ${
          mobile ? 'mobile' : 'desktop'
        } ${startup ? 'startup' : 'no-startup'}`}
      >
        <Component.MainNav mobile={mobile} />
        <section className={'default-layout__content'}>
          <Component.Header mobile={mobile} />
          <Layout.Transition>
            <main
              className={`${styles.main} ${
                snackbarActive && 'snackbar--active'
              }`}
            >
              {children}
            </main>
          </Layout.Transition>
          <Component.Snackbar />
        </section>
      </div>
    </Layout.Base>
  );
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
