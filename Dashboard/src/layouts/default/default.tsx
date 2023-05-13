import { Component } from '@lyttledev-dashboard/components';

export function Default({ children }: any) {
  return (
    <>
      <Component.Header />
      <main>{children}</main>
      <Component.Footer />
    </>
  );
}
