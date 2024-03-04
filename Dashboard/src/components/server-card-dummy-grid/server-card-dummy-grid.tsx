import styles from './server-card-dummy-grid.module.scss';
import Components from '@lyttledev-dashboard/components';

const dummyServers = 16;

export function ServerCardDummyGrid() {
  const servers = Array.from({ length: dummyServers }, (_, i) => i + 1);
  return (
    <section className={styles.grid}>
      {servers.map((v, i) => (
        <Components.ServerDummyCard key={i} />
      ))}
    </section>
  );
}
