import styles from './main-nav.module.scss';

export interface MainNavProps {
  open: boolean;
}

export function MainNav({ open }: MainNavProps) {
  const prefix = 'main-nav';
  const openClass = open
    ? `${prefix} ${prefix}--open`
    : `${prefix} ${prefix}--closed`;
  return (
    <aside className={`${openClass} ${styles['main-menu']}`}>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
