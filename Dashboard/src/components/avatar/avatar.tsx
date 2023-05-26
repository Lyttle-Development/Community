import styles from './avatar.module.scss';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import Image from 'next/image';
import { Component } from '@lyttledev-dashboard/components';

export function Avatar() {
  // TODO: Get real avatar url? or out of user object.
  const app = useApp() as any;
  const avatarUrl = app?.avatarUrl ?? '/media/images/placeholder-person.png';
  return (
    <article className={styles.container}>
      <Component.Link href="profile" className={styles.link}>
        <Image
          className={styles.avatar}
          src={avatarUrl}
          alt="Avatar"
          width={100}
          height={100}
        />
        Go to Profile
      </Component.Link>
    </article>
  );
}
