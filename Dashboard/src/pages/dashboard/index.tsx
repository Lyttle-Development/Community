import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { useEffect } from 'react';

function Page() {
  const app = useApp();
  const setPageTitle = app?.setPageTitle ?? ((p) => p);

  const title = getMessage(pagesPrefix + 'dashboard.title');
  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <div>Test</div>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
