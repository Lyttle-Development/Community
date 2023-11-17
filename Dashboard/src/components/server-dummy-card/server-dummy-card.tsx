import Image from 'next/image';
import styles from './server-dummy-card.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export function ServerDummyCard() {
  return (
    <div className={styles.card}>
      <Image
        className={styles.avatar}
        src={'/media/images/placeholder.png'}
        alt={'Dummy Server'}
        width={100}
        height={100}
      />
      <h2 className={`${styles.name} ${styles.mock}`}></h2>
      <ul className={styles.about}>
        <li className={styles.business}>
          <span className={`${styles.staffMembers} ${styles.mock}`}></span>
        </li>
        <li className={styles.stacks}>
          <span className={`${styles.modulesEnabled} ${styles.mock}`}></span>
        </li>
        <li className={styles.person}>
          <span className={`${styles.members} ${styles.mock}`}></span>
        </li>
      </ul>
      <Component.LightSwitch
        active={false}
        color={SCSSPrimaryColors.orange}
        className={styles.switch}
        disabled={true}
      />
    </div>
  );
}
