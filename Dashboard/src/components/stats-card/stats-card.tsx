import styles from './stats-card.module.scss';
import { formatNumber } from '@lyttledev-dashboard/utils';

export enum StatsCardColors {
  Purple = 'purple',
  Yellow = 'yellow',
  Orange = 'orange',
}

export interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  changeNote?: string;
  total?: number;
  color?: StatsCardColors;
}

export function StatsCard({
  title,
  value,
  change = 0,
  changeNote,
  total,
  color = StatsCardColors.Purple,
}: StatsCardProps) {
  const changeUnit = change ? (change < 0 ? '- ' : '+ ') : '';
  const changeValue = change < 0 ? change * -1 : change;
  // round to 5 , 10 ,15 20
  const roundedTotal = total ? Math.round(total / 5) * 5 : 0;
  return (
    <article className={`${styles.card} ${color && styles[`card--${color}`]}`}>
      <section className={styles.stats}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.value}>
          {formatNumber(value)}
          {!!change && change !== 0 && (
            <p className={styles.change}>
              {changeUnit}
              {formatNumber(changeValue)}
              {changeNote ?? '%'}
            </p>
          )}
        </h2>
      </section>
      <p className={`${styles.total} ${styles[`total--${roundedTotal}`]}`}>
        <span className={styles['total__value']}>{total}%</span>
      </p>
    </article>
  );
}
