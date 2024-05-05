import styles from './avatar.module.scss';
import Image from 'next/image';
import { Component } from '@lyttledev-dashboard/components';
import { useUser } from '@lyttledev-dashboard/hooks/useUser';

export function Avatar() {
  const selectedUser = useUser();
  return (
    <article className={styles.container}>
      <Component.Link href="profile" className={styles.link}>
        <Image
          className={styles.avatar}
          src={
            selectedUser?.avatar
              ? 'https://cdn.discordapp.com/avatars/' +
                selectedUser?.id +
                '/' +
                selectedUser?.avatar
              : '/media/images/placeholder.png'
          }
          alt={`Avatar of server ${selectedUser?.username}.`}
          width={100}
          height={100}
        />
        Go to Profile
      </Component.Link>
    </article>
  );
}
