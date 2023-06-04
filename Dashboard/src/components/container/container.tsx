import styles from './container.module.scss';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <section className={`container ${styles.container} ${className}`}>
      {children}
    </section>
  );
}
