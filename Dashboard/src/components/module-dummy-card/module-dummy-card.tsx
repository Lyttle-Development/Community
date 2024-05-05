import { Component } from '@lyttledev-dashboard/components';
import styles from './module-dummy-card.module.scss';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { Icons } from '@lyttledev-dashboard/components/icon';

export function ModuleDummyCard() {
  const cardInners = (
    <>
      <div className={styles.heading}>
        <h2>
          <span
            className={`${styles.title} mock`}
            style={{ width: '10rem', height: '2rem', marginRight: '1rem' }}
          ></span>
          <span
            className={`${styles.title} mock`}
            style={{ width: '15rem', height: '2rem' }}
          ></span>
        </h2>
        <div className={styles['heading__actions']}>
          <Component.LightSwitch
            active={false}
            color={SCSSPrimaryColors.yellow}
            className={styles['switch']}
            disabled={true}
            mock={true}
          />
          <Component.IconButton
            icon={Icons.cog}
            className={styles['cog']}
            disabled={true}
            mock={true}
          />
        </div>
      </div>
      <p className={`${styles.title} mock`} style={{ width: '70%' }}></p>
      <p className={`${styles.title} mock`} style={{ width: '90%' }}></p>
      <p className={`${styles.title} mock`} style={{ width: '80%' }}></p>
      <ul className={styles['sub-items']}>
        <li>
          <p className={styles['sub-item']}>
            <Component.Button
              color={ButtonColors.yellow}
              className={`${styles['sub-item__setup-button']} gray`}
              disabled={true}
            >
              Setup
            </Component.Button>
            <h3
              className={`${styles.title} mock`}
              style={{ width: '80%', height: '1.5rem' }}
            ></h3>
            <p className={`${styles.title} mock`} style={{ width: '90%' }}></p>
            <p className={`${styles.title} mock`} style={{ width: '70%' }}></p>
          </p>
        </li>
        <li>
          <p
            className={`${styles['sub-item']} ${styles['sub-item--add']} ${styles['sub-item__link']} gray`}
          >
            Add a new.<span>+</span>
          </p>
        </li>
      </ul>
    </>
  );

  return <article className={styles.card}>{cardInners}</article>;
}
