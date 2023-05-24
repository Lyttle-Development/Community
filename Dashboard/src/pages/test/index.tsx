import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';

function Page() {
  return <div className={styles.main}>Test</div>;
}

Page.getLayout = Layout.getDefault;

export default Page;
