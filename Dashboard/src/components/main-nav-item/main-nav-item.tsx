import styles from './main-nav-item.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { Icons } from '@lyttledev-dashboard/components/icon';

export interface MainNavItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  route?: string;
  locked?: boolean;
}

export function MainNavItem({
  href,
  onClick,
  children,
  route,
  locked = false,
}: MainNavItemProps) {
  route = route ?? href;
  return (
    <Component.Link
      href={href}
      route={route}
      onClick={onClick}
      className={styles['main-menu-item']}
      classNameActive={styles['main-menu-item--active']}
    >
      {children}
      {locked && (
        <Component.Icon
          className={styles.lock}
          icon={Icons.lock}
        ></Component.Icon>
      )}
    </Component.Link>
  );
}
