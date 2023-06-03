import { ChangeObject } from '@lyttledev-dashboard/contexts/App.context';
import { diffLines } from 'diff';
import styles from './select.module.scss';
import { changeKeysArray } from '@lyttledev-dashboard/components/review/review.config';

export interface SelectReviewCardProps {
  changeKey: string;
  change: ChangeObject;
}

export function SelectReviewCard({ changeKey, change }: SelectReviewCardProps) {
  if (
    typeof change.current !== 'string' ||
    typeof change.original !== 'string' ||
    !change.store ||
    typeof change.store !== 'string'
  ) {
    return null;
  }

  try {
    const options = JSON.parse(change.store);
    console.log(options);

    // Get original value
    const changeOriginal = change.original ?? '';
    const originalKey =
      options.find((item: any) => item.value == changeOriginal)?.key ?? '';
    const original =
      typeof originalKey === 'string'
        ? originalKey
        : `${originalKey.title}\n${originalKey.description}`;

    // Get current value
    const changeCurrent = change.current ?? '';
    const currentKey =
      options.find((item: { value: string }) => item.value == changeCurrent)
        ?.key ?? '';
    const current =
      typeof currentKey === 'string'
        ? currentKey
        : `${currentKey.title}\n${currentKey.description}`;

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
      changeKeysArray.find((item) => item.key === changeKey)?.title ??
      'Unknown';

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
  } catch (e) {
    return null;
  }
}
