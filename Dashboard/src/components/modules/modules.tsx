import { Component } from '@lyttledev-dashboard/components';
import { ModuleCardProps } from '@lyttledev-dashboard/components/module-card';
import styles from './modules.module.scss';

export type CardModules = ModuleCardProps[];

export interface ModulesProps {
  modules: CardModules;
}

export function Modules({ modules }: ModulesProps) {
  return (
    <ul className={styles.modules}>
      {modules.map((module, i) => (
        <li key={i}>
          <Component.ModuleCard {...module} />
        </li>
      ))}
    </ul>
  );
}
