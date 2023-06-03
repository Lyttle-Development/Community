import { ChangeObject } from '@lyttledev-dashboard/contexts/App.context';
import { diffLines } from 'diff';
import styles from './string.module.scss';
import { changeKeysArray } from '@lyttledev-dashboard/components/review/review.config';

export interface StringReviewCardProps {
  changeKey: string;
  change: ChangeObject;
}

export function StringReviewCard({ changeKey, change }: StringReviewCardProps) {
  if (
    typeof change.current !== 'string' ||
    typeof change.original !== 'string'
  ) {
    return null;
  }

  const original = change.original ?? '';
  const current = change.current ?? '';

  const lineDifference = diffLines(original, current);

  const split = (text: string) => (
    <>
      {text.split('\n').map((line, i) => {
        if (!line) return null;
        return <div key={i}>{line}</div>;
      })}
    </>
  );

  const title =
    changeKeysArray.find((item) => item.key === changeKey)?.title ?? 'Unknown';

  return (
    <article className={styles.card}>
      <h1>{title}</h1>
      <section className={styles.lines}>
        {lineDifference.map(({ added, removed, value }, i) => {
          if (added) {
            return (
              <p key={i} className={styles.added}>
                {split(value)}
              </p>
            );
          }
          if (removed) {
            return (
              <p key={i} className={styles.removed}>
                {split(value)}
              </p>
            );
          }
          return (
            <p key={i} className={styles.unchanged}>
              {split(value)}
            </p>
          );
        })}
      </section>
    </article>
  );
}
