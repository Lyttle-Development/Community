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
  const router = useRouter();
  const guildId = app?.selectedGuildId ?? '';
  let changes: [string, ChangeObject][] = Object.entries(app?.changes ?? {});
  const [confirm, setConfirm] = useState(false);
  const [mutation, setMutation] = useState<string>(initialMutation);

  changes = changes.map(([key, change]) => {
    key = key.split('/')[0];
    return [key, change];
  });

  // Get the mutation from the review builder
  const reviewBuilderMutation = reviewBuilder(guildId, changes);
  // Create the GQL mutation
  const mutationGQL = gql(reviewBuilderMutation ?? mutation ?? initialMutation);
  // Create the mutation hook
  const [mutate, { loading }] = useMutation(mutationGQL);

  // Update the mutation when the review builder changes
  useEffect(() => {
    // If there is no mutation, use the initial mutation
    if (!reviewBuilderMutation) return;
    // Update the mutation
    setMutation(reviewBuilderMutation);
  }, [reviewBuilderMutation]);

  // Reset the confirmation state after 2 seconds
  useEffect(() => {
    // Declare the timeout
    let timeout: NodeJS.Timeout;
    // If the confirmation state is true, set the timeout
    if (confirm) {
      // return confirm to false after 2 seconds
      timeout = setTimeout(() => setConfirm(false), 2000);
    }
    // Return the cleanup function
    return () => clearTimeout(timeout);
  }, [confirm]);

  // If there are no changes, redirect to the modules page. (When it's not loading)
  if (!loading && changes.length < 1) {
    void router.push(`/dashboard/${guildId}/modules`);
    return null;
  }

  // Submit the changes
  const submitChanges = async () => {
    // Execute the mutation
    const { errors } = await mutate();
    // If there are errors, return (thus not resetting the changes)
    if (errors) return;
    // Reset the changes
    app?.resetChanges();
    // Redirect to the modules page
    await router.push(`/dashboard/${guildId}/modules`);
    // Reload the page
    await router.reload();
  };

  // Get the messages
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
