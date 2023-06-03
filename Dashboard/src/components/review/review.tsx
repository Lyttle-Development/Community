import { StatsCardProps } from '@lyttledev-dashboard/components/stats-card';
import { Component } from '@lyttledev-dashboard/components';
import styles from './review.module.scss';
import {
  ChangeObject,
  useApp,
} from '@lyttledev-dashboard/contexts/App.context';

export interface ReviewProps {
  stats: StatsCardProps[];
}

export function Review() {
  const app = useApp();
  const changes: [string, ChangeObject][] = Object.entries(app?.changes ?? {});

  if (changes.length < 1) return null;

  return (
    <ul className={styles.review}>
      {changes.map(([key, change], i) => (
        <li key={i}>
          <Component.ReviewCard changeKey={key} change={change} />
        </li>
      ))}
    </ul>
  );
}
