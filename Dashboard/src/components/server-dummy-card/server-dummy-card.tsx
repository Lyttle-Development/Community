import styles from './server-dummy-card.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export function ServerDummyCard() {
  return (
    <div className={styles.card}>
      <Component.Image
        className={styles.avatar}
        src={'/media/images/placeholder.png'}
        alt={'Dummy Server'}
        width={100}
        height={100}
      />
      <h2 className={`${styles.name} mock`}></h2>
      <ul className={styles.about}>
        <li className={styles.business}>
          <span className={`${styles.staffMembers} mock`}></span>
        </li>
        <li className={styles.stacks}>
          <span className={`${styles.modulesEnabled} mock`}></span>
        </li>
        <li className={styles.person}>
          <span className={`${styles.members} mock`}></span>
        </li>
      </ul>
      <Component.LightSwitch
        active={false}
        color={SCSSPrimaryColors.orange}
        className={styles.switch}
        disabled={true}
        mock={true}
      />
    </div>
  );
}
