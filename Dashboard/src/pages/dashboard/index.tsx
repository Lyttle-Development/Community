import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';

function Page() {
  const title = usePage(pagesPrefix + 'dashboard.title');

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.ServerCardGrid />
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
