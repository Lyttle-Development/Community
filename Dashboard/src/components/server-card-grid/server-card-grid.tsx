import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { getMessage } from '@lyttledev-dashboard/utils';
import styles from './server-card-grid.module.scss';

export function ServerCardGrid() {
  const msgInputPlaceholder = getMessage(
    componentsPrefix + 'search.input-placeholder',
  );

  return (
    <section className={styles.grid}>
      {[...Array(2)].map((_, i) => (
        <Component.ServerCard key={i} active={true} />
      ))}
      {[...Array(5)].map((_, i) => (
        <Component.ServerCard key={i} active={false} />
      ))}
      {[...Array(18)].map((_, i) => (
        <Component.ServerCard key={i} />
      ))}
    </section>
  );
}
