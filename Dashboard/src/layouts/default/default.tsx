import { Component } from '@lyttledev-dashboard/components';
import { Layout } from '@lyttledev-dashboard/layouts';
import React from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  const app = useApp();
  const mainNavOpen = app?.mainNavOpen ?? false;

  return (
    <Layout.Base>
      <Component.Startup></Component.Startup>
      <div className={`default-layout ${mainNavOpen ? 'main-nav--open' : ''}`}>
        <Component.MainNav />
        <section>
          <Component.Header />
          <Layout.Transition>
            <main>{children}</main>
          </Layout.Transition>
          {/* <Component.Footer />*/}
        </section>
      </div>
    </Layout.Base>
  );
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
