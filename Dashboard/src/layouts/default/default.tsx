import { Component } from '@lyttledev-dashboard/components';
import { Layout } from '@lyttledev-dashboard/layouts';
import React from 'react';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  return (
    <Layout.Base>
      <Component.Header />
      <main>{children}</main>
      <Component.Footer />
    </Layout.Base>
  );
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
