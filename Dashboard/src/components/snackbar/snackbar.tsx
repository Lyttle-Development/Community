import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect, useState } from 'react';
import styles from './snackbar.module.scss';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { useRouter } from 'next/router';

export function Snackbar() {
  const app = useApp();
  const guildId = useGuild();
  const router = useRouter();
  const [changes, setChanges] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [hasChanges, setHasChanges] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [closingReset, setClosingReset] = useState(5);

  useEffect(() => {
    setResetting(false);
    const appChanges = app?.changes ?? {};
    const _changes = Object.keys(appChanges).length;
    setChanges(_changes);

    const change = _changes > 0;
    if (!change) {
      const a = setTimeout(() => setHidden(!change), 500);
      const b = setTimeout(() => setHasChanges(change), 100);
      return () => {
        clearTimeout(a);
        clearTimeout(b);
      };
    }
    setHidden(!change);
    const c = setTimeout(() => setHasChanges(change), 100);
    return () => {
      clearTimeout(c);
    };
  }, [app?.changes]);

  useEffect(() => {
    if (!resetting) return;
    setClosingReset(5);
    const countDown = setInterval(() => {
      setClosingReset((prev) => prev - 1);
    }, 1000);
    const closeResetTimeout = setTimeout(() => {
      setResetting(false);
      clearInterval(countDown);
      setClosingReset(5);
    }, 5000);
    return () => {
      clearTimeout(closeResetTimeout);
      clearInterval(countDown);
      setClosingReset(5);
    };
  }, [resetting]);

  const onReset = () => {
    app?.change({ update: { key: 'reset' } });
  };

  const pfx = componentsPrefix + 'snackbar.';

  const msgChangesMessage = getMessage(pfx + 'changes.title');
  const msgChangesReview = getMessage(pfx + 'changes.review');
  const msgChangesReset = getMessage(pfx + 'changes.reset');

  const msgResettingMessage = getMessage(pfx + 'resetting.title');
  const msgResettingCancel = getMessage(pfx + 'resetting.cancel');
  const msgResettingReset = getMessage(pfx + 'resetting.reset');

  if (router.pathname === '/servers/[guild_id]/review') {
    if (hasChanges) setHasChanges(false);
  }
  return (
    <Component.Container
      className={`${styles.container} ${
        hidden && styles.hidden
      } snackbar-container`}
    >
      <article
        className={`${styles.snackbar} ${
          hasChanges && styles.changes
        } snackbar`}
      >
        {!resetting ? (
          <>
            <p className={`${styles.message} snackbar-message`}>
              {msgChangesMessage}
              <span className={`${styles.amount} snackbar-amount`}>
                ({changes})
              </span>
            </p>
            <section className={`${styles.actions} snackbar-actions`}>
              <Component.Button
                color={ButtonColors.secondary}
                className={styles['reset-btn']}
                text={msgChangesReset}
                onClick={() => setResetting(true)}
              />
              <Component.Button
                color={ButtonColors.orange}
                className={styles['review-btn']}
                text={msgChangesReview}
                href={`/servers/${guildId ?? '0'}/review`}
              />
            </section>
          </>
        ) : (
          <>
            <p className={`${styles.message} snackbar-message`}>
              {msgResettingMessage}
              <span className={`${styles.amount} snackbar-amount`}>
                ({closingReset}/5)
              </span>
            </p>
            <section className={`${styles.actions} snackbar-actions`}>
              <Component.Button
                color={ButtonColors.secondary}
                className={styles['reset-btn']}
                text={msgResettingCancel}
                onClick={() => setResetting(false)}
              />
              <Component.Button
                color={ButtonColors.orange}
                className={styles['review-btn']}
                text={msgResettingReset}
                onClick={onReset}
              />
            </section>
          </>
        )}
      </article>
    </Component.Container>
  );
}
