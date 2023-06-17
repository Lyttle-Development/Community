import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';
import { diffLines } from 'diff';
import styles from './select.module.scss';
import { changeKeysValuesArray } from '@lyttledev-dashboard/components/review';

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
          return <p key={i}>{line}</p>;
        })}
      </>
    );

    const title =
      changeKeysValuesArray.find((item) => item.key === changeKey)?.title ??
      'Unknown';

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
  } catch (e) {
    return null;
  }
}
