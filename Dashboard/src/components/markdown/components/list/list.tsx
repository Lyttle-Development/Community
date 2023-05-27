import React from 'react';
import styles from './List.module.scss';

export interface ListProps {
  children: React.ReactNode;
  ordered?: boolean;
}

export const List = ({ children, ordered }: ListProps): JSX.Element => {
  return (
    <>
      {ordered ? (
        <ol className={styles.list}>{children}</ol>
      ) : (
        <ul className={styles.list}>{children}</ul>
      )}
    </>
  );
};
