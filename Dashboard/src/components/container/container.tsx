import styles from './container.module.scss';

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <section className={styles.container}>{children}</section>;
}