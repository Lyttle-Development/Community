import { StatsCardProps } from '@lyttledev-dashboard/components/stats-card';
import { Component } from '@lyttledev-dashboard/components';
import styles from './stats.module.scss';

export interface StatsProps {
  stats: StatsCardProps[];
}

export function Stats({ stats }: StatsProps) {
  if (!stats || stats.length < 1) return null;

  return (
    <ul className={styles.stats}>
      {stats.map((stat, i) => (
        <li key={i}>
          <Component.StatsCard {...stat} />
        </li>
      ))}
    </ul>
  );
}
