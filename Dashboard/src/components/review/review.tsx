import { StatsCardProps } from '@lyttledev-dashboard/components/stats-card';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './review.module.scss';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { getMessage } from '@lyttledev-dashboard/utils';
import { changeKeysValuesArray } from '@lyttledev-dashboard/components/review';
import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';
import { reviewBuilder } from '@lyttledev-dashboard/components/review/review.builder';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export interface ReviewProps {
  stats: StatsCardProps[];
}

const initialMutation = 'mutation { updateGuild { id } }';

export function Review() {
  const app = useApp();
  const guildId = app?.selectedGuildId ?? '';
  const changes: [string, ChangeObject][] = Object.entries(app?.changes ?? {});
  const [confirm, setConfirm] = useState(false);
  const [mutation, setMutation] = useState<string>(initialMutation);
  const router = useRouter();

  const _mutation = reviewBuilder(guildId, changes);
  const mutationGQL = gql(_mutation ?? mutation ?? initialMutation);
  const [mutate, { loading }] = useMutation(mutationGQL);

  useEffect(() => {
    if (!_mutation) return;
    setMutation(_mutation);
  }, [_mutation]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (confirm) {
      timeout = setTimeout(() => setConfirm(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [confirm]);

  if (!loading && changes.length < 1) {
    void router.push(`/dashboard/${guildId}/modules`);
    return null;
  }

  const submitChanges = async () => {
    await mutate();
    app?.resetChanges();
    await router.push(`/dashboard/${guildId}/modules`);
  };

  const msgReview = getMessage(componentsPrefix + 'review.title');
  const msgSubmit = getMessage(componentsPrefix + 'review.submit');
  const msgConfirm = getMessage(componentsPrefix + 'review.confirm');

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
      {mutation && !loading && !confirm && (
        <Component.Button
          text={msgSubmit}
          color={ButtonColors.orange}
          onClick={() => setConfirm(true)}
          className={styles.submit}
        />
      )}
      {mutation && !loading && confirm && (
        <Component.Button
          text={msgConfirm}
          color={ButtonColors.purple}
          onClick={submitChanges}
          className={styles.submit}
        />
      )}
    </>
  );
}
