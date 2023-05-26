import { componentsPrefix } from '@lyttledev-dashboard/components/imports';
import { getMessage } from '@lyttledev-dashboard/utils';
import { Component } from '@lyttledev-dashboard/components';
import styles from './server-card-grid.module.scss';

export function ServerCardGrid() {
  const msgInputPlaceholder = getMessage(
    componentsPrefix + 'search.input-placeholder',
  );

  return (
    <section className={styles.grid}>
      {[...Array(9)].map((_, i) => (
        <Component.ServerCard key={i} />
      ))}
    </section>
  );
}
