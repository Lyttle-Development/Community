import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';

function Page() {
  useGuild();
  const title = usePage(pagesPrefix + 'overview.title');

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.Review />
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
