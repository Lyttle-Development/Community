import styles from './boolean.module.scss';
import { changeKeysArray } from '@lyttledev-dashboard/components/review';
import { Component } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';

export interface BooleanReviewCardProps {
  changeKey: string;
  change: ChangeObject;
}

export function BooleanReviewCard({
  changeKey,
  change,
}: BooleanReviewCardProps) {
  if (
    typeof change.current !== 'boolean' ||
    typeof change.original !== 'boolean'
  ) {
    return null;
  }

  const title =
    changeKeysArray.find((item) => item.key === changeKey)?.title ?? 'Unknown';

  const statusText = change.current ? 'was enabled' : 'was disabled';

  return (
    <article className={styles.card}>
      <div
        className={`${styles.status} ${
          change.current ? styles.enabled : styles.disabled
        }`}
      >
        <h1>{title}</h1>
        <section className={styles.change}>
          <p
            className={`${styles.text} ${
              change.current ? styles.enabled : styles.disabled
            }`}
          >
            {statusText}
          </p>
          <Component.LightSwitch
            active={change.current}
            disabled={true}
            color={SCSSPrimaryColors.yellow}
            className={styles.switch}
          />
        </section>
      </div>
    </article>
  );
}
