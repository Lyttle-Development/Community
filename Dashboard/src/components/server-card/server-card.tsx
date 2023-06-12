import { ButtonColors } from '@lyttledev-dashboard/components/imports';
import { getMessage } from '@lyttledev-dashboard/utils';
import Image from 'next/image';
import styles from './server-card.module.scss';
import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export interface Server {
  id: string;
  name: string | null;
  icon: string | null;
  setup: boolean;
  active: boolean | null;
  members: number;
  modulesEnabled: number;
}

export type Servers = Server[];

export type ServerCardProps = Server;

export function ServerCard({
  id,
  name,
  icon,
  setup,
  active,
  members,
  modulesEnabled,
}: ServerCardProps) {
  // Messages
  const pfx = componentsPrefix + 'server-card.';
  // const msgStaffMembers = getMessage(pfx + 'staff-members');
  const msgModules = getMessage(pfx + 'modules');
  const msgMembers = getMessage(pfx + 'members');
  const msgSetup = getMessage(pfx + 'setup');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  if (!icon) return null;

  if (!setup) {
    return (
      <article className={styles.card}>
        <Image
          className={styles.avatar}
          src={icon}
          alt={`Avatar of the ${name} server`}
          width={100}
          height={100}
        />
        <h2 className={styles.title}>{name}</h2>
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
    <Component.Link href={`/dashboard/${id}/modules`} className={styles.card}>
      <Image
        className={styles.avatar}
        src={icon}
        alt={`Avatar of the ${name} server`}
        width={100}
        height={100}
      />
      <h2>{name}</h2>
      <ul className={styles.about}>
        {/* <li className={styles.business}>*/}
        {/*  <span>{staffMembers}</span> {msgStaffMembers}*/}
        {/* </li>*/}
        <li className={styles.stacks}>
          <span>{modulesEnabled}</span> {msgModules}
        </li>
        <li className={styles.person}>
          <span>{members}</span> {msgMembers}
        </li>
      </ul>
      <Component.LightSwitch
        active={active ?? false}
        // Todo: Toggle server / add to actions for graphql
        onClick={(e) => alert('Switched!')}
        color={SCSSPrimaryColors.orange}
        className={styles.switch}
      />
    </Component.Link>
  );
}
