import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect, useState } from 'react';
import styles from './snackbar.module.scss';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';

export function Snackbar() {
  const app = useApp();
  const guildId = useGuild();
  const [changes, setChanges] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [hasChanges, setHasChanges] = useState(true);

  useEffect(() => {
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

  const pfx = componentsPrefix + 'snackbar.';

  const msgMessage = getMessage(pfx + 'title');
  const msgReview = getMessage(pfx + 'review');
  const msgReset = getMessage(pfx + 'reset');

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
        <p className={`${styles.message} snackbar-message`}>
          {msgMessage}
          <span className={`${styles.amount} snackbar-amount`}>
            ({changes})
          </span>
        </p>
        <section className={`${styles.actions} snackbar-actions`}>
          <Component.Button
            color={ButtonColors.secondary}
            className={styles['review-btn']}
            text={msgReview}
            href={`/dashboard/${guildId ?? '0'}/review`}
          />
          <Component.Button
            color={ButtonColors.orange}
            className={styles['reset-btn']}
            text={msgReset}
            onClick={() => app?.updateChange('reset')}
          />
        </section>
      </article>
    </Component.Container>
  );
}
