import { ButtonColors } from '@lyttledev-dashboard/components/imports';
import { getMessage } from '@lyttledev-dashboard/utils';
import Image from 'next/image';
import styles from './server-card.module.scss';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { useState } from 'react';

export interface ServerCardProps {
  active?: boolean;
}

export function ServerCard({ active }: ServerCardProps) {
  const [a, setA] = useState(active ?? false);
  const isNew = active === undefined;

  // Messages
  const pfx = componentsPrefix + 'server-card.';
  const msgStaffMembers = getMessage(pfx + 'staff-members');
  const msgModules = getMessage(pfx + 'modules');
  const msgMembers = getMessage(pfx + 'members');
  const msgSetup = getMessage(pfx + 'setup');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  // Values
  const guildImage = '/media/images/placeholder.png';
  const guildName = active ? 'LyttleDev' : 'KneegHub';
  const guildId = active ? '874234773969715230' : '874234773969716230';
  const staffMembers = 8;
  const modules = 12;
  const members = 245;

  if (isNew) {
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
        <p>{msgSetup}</p>
        <Component.Button
          color={ButtonColors.orange}
          text={msgSetupButton}
          // Todo: Setup server
          onClick={() => window.alert('Setup')}
        />
      </article>
    );
  }

  return (
    <Component.Link
      href={`/dashboard/${guildId}/modules`}
      className={styles.card}
    >
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
        active={active}
        // Todo: Toggle server / add to actions for graphql
        onClick={(e) => alert('Switched!')}
        color={SCSSPrimaryColors.orange}
        className={styles.switch}
      />
    </Component.Link>
  );
}
