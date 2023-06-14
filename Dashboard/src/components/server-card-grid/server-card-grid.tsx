import { Component } from '@lyttledev-dashboard/components';
import styles from './server-card-grid.module.scss';

interface ServerCardGridProps {
  servers: any[];
}

export function ServerCardGrid({ servers }: ServerCardGridProps) {
  return (
    <section className={styles.grid}>
      {servers.map((server, i) => (
        <Component.ServerCard key={i} {...server} />
      ))}
    </section>
  );
}
