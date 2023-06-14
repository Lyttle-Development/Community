import styles from './stats-card.module.scss';

export enum StatsCardColors {
  Purple = 'purple',
  Yellow = 'yellow',
  Orange = 'orange',
}

export interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  total?: number;
  color?: StatsCardColors;
}

export function StatsCard({
  title,
  value,
  change,
  total,
  color = StatsCardColors.Purple,
}: StatsCardProps) {
  const changeUnit = change ? (change < 0 ? '- ' : '+ ') : '';
  return (
    <article className={`${styles.card} ${color && styles[`card--${color}`]}`}>
      <section className={styles.stats}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.value}>
          {value}
          {!!change && change !== 0 && (
            <p className={styles.change}>
              {changeUnit}
              {change < 0 ? change * -1 : change}%
            </p>
          )}
        </h2>
      </section>
      <p className={styles.total}>
        <span className={styles['total__value']}>{total}%</span>
      </p>
    </article>
  );
}
