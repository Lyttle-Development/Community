import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect } from 'react';

export const pagesPrefix = dashboardPrefix + 'pages.';

function Page() {
  const app = useApp();
  const setPageTitle = app?.setPageTitle ?? ((p) => p);

  const title = getMessage(pagesPrefix + 'home.title');
  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <div className={styles.main}>Test</div>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
