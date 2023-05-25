import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';

function Page() {
  return (
    <>
      <Component.Title>Home</Component.Title>
      <div className={styles.main}>Test</div>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
