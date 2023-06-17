import { StatsCardProps } from '@lyttledev-dashboard/components/stats-card';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './review.module.scss';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { getMessage } from '@lyttledev-dashboard/utils';
import { changeKeysValuesArray } from '@lyttledev-dashboard/components/review';
import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';
import { reviewBuilder } from '@lyttledev-dashboard/components/review/review.builder';

export interface ReviewProps {
  stats: StatsCardProps[];
}

export function Review() {
  const app = useApp();
  const guildId = app?.selectedGuildId ?? '';
  const changes: [string, ChangeObject][] = Object.entries(app?.changes ?? {});

  if (changes.length < 1) return null;

  const submitChanges = () => {
    // TODO: Submit changes
    window.alert('Changes submitted!');
  };

  console.log(reviewBuilder(guildId, changes));

  const msgReview = getMessage(componentsPrefix + 'review.title');
  const msgSubmit = getMessage(componentsPrefix + 'review.submit');

  return (
    <>
      <h1 className={styles.title}>{msgReview}</h1>
      <ul className={styles.review}>
        {changes.map(([key, change], i) => {
          const hrefFunc = changeKeysValuesArray.find(
            (item) => item.key === key,
          )?.url;

          if (!hrefFunc) {
            return (
              <li key={i}>
                <Component.ReviewCard changeKey={key} change={change} />
              </li>
            );
          }

          const href = hrefFunc(guildId);
          return (
            <li key={i}>
              <Component.Link href={href}>
                <Component.ReviewCard changeKey={key} change={change} />
              </Component.Link>
            </li>
          );
        })}
      </ul>
      <Component.Button
        text={msgSubmit}
        color={ButtonColors.orange}
        onClick={submitChanges}
        className={styles.submit}
      />
    </>
  );
}
