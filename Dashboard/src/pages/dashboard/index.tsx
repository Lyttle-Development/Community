import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';

function Page() {
  const authorized = useAuth();
  const title = usePage(pagesPrefix + 'dashboard.title');

  if (!authorized) return null;

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
