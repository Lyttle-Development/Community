import { Component } from '@lyttledev-dashboard/components';
import { Layout } from '@lyttledev-dashboard/layouts';
import React from 'react';
import './default.scss';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  const app = useApp();
  const mainNavOpen = app?.mainNavOpen ?? false;
  const toggleMainNav = app?.toggleMainNav ?? (() => console.log(':"('));

  return (
    <Layout.Base>
      <div className={`default-layout ${mainNavOpen ? 'main-nav--open' : ''}`}>
        <Component.MainNav open={mainNavOpen} />
        <section>
          <button onClick={toggleMainNav}>{'E'.repeat(50)}</button>
          <Component.Header />
          <main>{children}</main>
          <Component.Footer />
        </section>
      </div>
    </Layout.Base>
  );
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
