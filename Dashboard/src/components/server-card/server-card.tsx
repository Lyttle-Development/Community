import { componentsPrefix } from '@lyttledev-dashboard/components/imports';
import { getMessage } from '@lyttledev-dashboard/utils';
import Image from 'next/image';
import styles from './server-card.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export function ServerCard() {
  // Messages
  const pfx = componentsPrefix + 'server-card.';
  const msgStaffMembers = getMessage(pfx + 'staff-members');
  const msgModules = getMessage(pfx + 'modules');
  const msgMembers = getMessage(pfx + 'members');

  // Values
  const guildImage = '/media/images/placeholder.png';
  const guildName = 'LyttleDev';
  const staffMembers = 8;
  const modules = 12;
  const members = 245;
  const enabled = true;

  return (
    <article className={styles.card}>
      <Image
        className={styles.avatar}
        src={guildImage}
        alt={`Avatar of the ${guildName} server`}
        width={100}
        height={100}
      />
      <h2>{guildName}</h2>
      <ul className={styles.about}>
        <li className={styles.business}>
          <span>{staffMembers}</span> {msgStaffMembers}
        </li>
        <li className={styles.stacks}>
          <span>{modules}</span> {msgModules}
        </li>
        <li className={styles.person}>
          <span>{members}</span> {msgMembers}
        </li>
      </ul>
      <Component.LightSwitch
        active={enabled}
        onClick={(e) => console.log(e)}
        color={SCSSPrimaryColors.organge}
        className={styles.switch}
      />
    </article>
  );
}
