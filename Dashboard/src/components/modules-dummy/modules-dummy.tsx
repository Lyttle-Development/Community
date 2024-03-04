import { Component } from '@lyttledev-dashboard/components';
import styles from './modules-dummy.module.scss';

const dummyModules = 4;

export function ModulesDummy() {
  const modules = Array.from({ length: dummyModules }, (_, i) => i + 1);
  return (
    <ul className={styles.modules}>
      {modules.map((m, i) => (
        <li key={i}>
          <Component.ModuleDummyCard />
        </li>
      ))}
    </ul>
  );
}
