import styles from './main-nav-item.module.scss';
import { Component } from '@lyttledev-dashboard/components';

export interface MainNavItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function MainNavItem({ href, onClick, children }: MainNavItemProps) {
  return (
    <Component.Link
      href={href}
      onClick={onClick}
      className={styles['main-menu-item']}
      classNameActive={styles['main-menu-item--active']}
    >
      {children}
    </Component.Link>
  );
}
