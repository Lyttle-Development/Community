import { Component } from '@lyttledev-dashboard/components';
import { Layout } from '@lyttledev-dashboard/layouts';
import React, { useEffect } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import styles from './default.module.scss';
import { useRouter } from 'next/router';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  const app = useApp();
  const mainNavOpen = app?.mainNavOpen ?? false;
  const mobile = app?.mobile ?? true;
  const router = useRouter();
  const snackbarActive = Object.keys(app?.changes ?? {}).length > 0;

  useEffect(() => {
    if (!mobile) return;
    app?.setMainNavOpen(false);
  }, [router.route]);

  return (
    <Layout.Base>
      <Component.Startup mobile={mobile} />
      <div
        className={`default-layout ${mainNavOpen ? 'main-nav--open' : ''} ${
          mobile ? 'mobile' : ''
        }`}
      >
        <Component.MainNav mobile={mobile} />
        <Layout.Transition>
          <section>
            <Component.Header mobile={mobile} />
            <main
              className={`${styles.main} ${
                snackbarActive && 'snackbar--active'
              }`}
            >
              {children}
            </main>
            <Component.Snackbar />
          </section>
        </Layout.Transition>
      </div>
    </Layout.Base>
  );
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
