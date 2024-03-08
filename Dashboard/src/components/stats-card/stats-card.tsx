import styles from './stats-card.module.scss';
import { formatNumber } from '@lyttledev-dashboard/utils';
import { useEffect, useState } from 'react';

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

const defaultAnimationTime = 1000;

export function StatsCard({
  title,
  value,
  change = 0,
  changeNote,
  total = 0,
  color = StatsCardColors.Purple,
}: StatsCardProps) {
  const [totalTime, setTotalTime] = useState(defaultAnimationTime);
  const [currentTotal, setCurrentTotal] = useState(total);
  const [degrees, setDegrees] = useState(0);
  const [rotate, setRotate] = useState(false);
  const changeUnit = change ? (change < 0 ? '- ' : '+ ') : '';
  const changeValue = change < 0 ? change * -1 : change;

  // round to 5 , 10 ,15 20
  // const roundedTotal = total ? Math.round(total / 5) * 5 : 0;
  const setTotal = () => {
    if (currentTotal !== total) {
      if (currentTotal < total) {
        setCurrentTotal(currentTotal + 1);
      }
      if (currentTotal > total) {
        setCurrentTotal(currentTotal - 1);
      }
    }

    if (total > 0) {
      let totalDegrees = (currentTotal / 100) * 360 + 270;
      totalDegrees = totalDegrees > 360 ? totalDegrees - 360 : totalDegrees;

      setDegrees(totalDegrees);
      if (currentTotal > 50) {
        setRotate(true);
      } else {
        setRotate(false);
      }
    } else {
      setDegrees(270);
      setRotate(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(setTotal, totalTime);
    return () => clearTimeout(timeout);
  }, [total, currentTotal]);

  useEffect(() => {
    setTotal();
  }, []);

  useEffect(() => {
    setTotalTime(defaultAnimationTime / total);
  }, [total]);

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
      <p className={styles.total}>
        <span className={styles['progress-bar__container']}>
          <span
            className={styles['progress-bar']}
            style={{
              transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)',
              background: `linear-gradient(${degrees}deg, ${
                rotate ? 'white' : 'black'
              } 50%, transparent 0),
      linear-gradient(${
        rotate ? 'to right' : 'to left'
      }, white 50%, transparent 0)`,
            }}
          ></span>
        </span>
        <span className={styles['total__value']}>{currentTotal}%</span>
      </p>
    </article>
  );
}
