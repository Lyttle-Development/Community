import styles from './card.module.scss';

export interface CardProps {
  children?: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <article className={styles.card}>{children}</article>;
}
