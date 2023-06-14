import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';
import { diffLines } from 'diff';
import styles from './string.module.scss';
import { changeKeysArray } from '@lyttledev-dashboard/components/review';

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
        return <p key={i}>{line}</p>;
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
              <div key={i} className={styles.added}>
                {split(value)}
              </div>
            );
          }
          if (removed) {
            return (
              <div key={i} className={styles.removed}>
                {split(value)}
              </div>
            );
          }
          return (
            <div key={i} className={styles.unchanged}>
              {split(value)}
            </div>
          );
        })}
      </section>
    </article>
  );
}
