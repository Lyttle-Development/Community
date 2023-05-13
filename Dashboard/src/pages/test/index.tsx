import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { ReactElement } from 'react';

function Page() {
  return <div className={styles.main}>Test</div>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout.Default>{page}</Layout.Default>;
};

export default Page;
