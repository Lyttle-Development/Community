import styles from './tip-card.module.scss';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { useEffect, useState } from 'react';
import { getMessage, storage } from '@lyttledev-dashboard/utils';

export interface TipCardProps {
  title: string;
  description: string | null;
  tipKey: string;
  onClose?: () => void;
}

export function TipCard({ title, description, tipKey, onClose }: TipCardProps) {
  const [tipCard, setTipCard] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const dismiss = storage.get('tip-card') ?? null;
    const oldTipCard = dismiss ? JSON.parse(dismiss) : {};
    setTipCard(oldTipCard);
  }, []);

  if (tipCard[tipKey] && description === tipCard[tipKey]) return null;

  const onDismiss = () => {
    if (description === null) return;
    const newTipCard = { ...tipCard, [tipKey]: description };
    console.log(newTipCard, tipKey);
    setTipCard(newTipCard);
    storage.set('tip-card', JSON.stringify(newTipCard));
    if (onClose) onClose();
  };

  const msgDismiss = getMessage(componentsPrefix + 'tip-card.dismiss');

  return (
    <article className={styles.card}>
      <h2 className={`${styles.title} tip-card__title`}>{title}</h2>
      <section className={`${styles.message} tip-card__message`}>
        <p className={`${styles.description} ${!description && styles.mocks}`}>
          {description ? (
            description
          ) : (
            <>
              <span className={`${styles.mock} ${styles['mock-1']}`} />
              <span className={`${styles.mock} ${styles['mock-2']}`} />
              <span className={`${styles.mock} ${styles['mock-3']}`} />
            </>
          )}
        </p>
        <Component.Button
          text={msgDismiss}
          onClick={onDismiss}
          disabled={description === null}
        ></Component.Button>
      </section>
    </article>
  );
}
