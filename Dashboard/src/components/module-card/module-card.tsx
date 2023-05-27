import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './module-card.module.scss';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { getMessage } from '@lyttledev-dashboard/utils';

interface ModuleCardItem {
  id: string | null;
  route: string;
  title: string;
  description: string;
  active: boolean;
}

export interface ModuleCardProps extends ModuleCardItem {
  setup: boolean;
  extendable?: boolean;
  subItems?: ModuleCardItem[];
  onClick: (subItem: boolean, id: string | null, active: boolean) => void;
}

export function ModuleCard({
  setup,
  title,
  description,
  route,
  active,
  onClick,
  subItems,
  id,
  extendable = false,
}: ModuleCardProps) {
  const pfx = componentsPrefix + 'module-card.';
  const msgTitlePrefix = getMessage(pfx + 'title-prefix');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  const cardInners = (
    <>
      {!extendable && setup && (
        <Component.LightSwitch
          active={active}
          onClick={() => onClick(false, id, !active)}
          color={SCSSPrimaryColors.yellow}
          className={styles['switch']}
        />
      )}
      {!extendable && !setup && (
        <Component.Button
          color={ButtonColors.yellow}
          onClick={() => onClick(false, null, true)}
          className={styles['setup-button']}
        >
          {msgSetupButton}
        </Component.Button>
      )}
      <h2 className={styles.title}>
        {msgTitlePrefix} {title}
      </h2>
      <p className={styles.description}>{description}</p>
      {subItems && (
        <ul className={styles['sub-items']}>
          {subItems.length > 1 &&
            subItems.map((item, i) => (
              <li key={i}>
                <Component.Link
                  href={item.route}
                  className={`${styles['sub-item']} ${
                    item.id === null && styles['sub-item--setup']
                  }`}
                >
                  {item.id !== null && (
                    <Component.LightSwitch
                      active={item.active}
                      onClick={() => onClick(true, item.id, !item.active)}
                      className={styles['sub-item__switch']}
                      color={SCSSPrimaryColors.yellow}
                    />
                  )}
                  {item.id === null && (
                    <Component.Button
                      color={ButtonColors.yellow}
                      onClick={() => onClick(false, null, true)}
                      className={styles['sub-item__setup-button']}
                    >
                      {msgSetupButton}
                    </Component.Button>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Component.Link>
              </li>
            ))}
          {extendable && (
            <li>
              <Component.Link
                onClick={() => onClick(true, null, true)}
                className={`${styles['sub-item']} ${styles['sub-item--add']} ${styles['sub-item__link']}`}
              >
                Add a new {title.toLowerCase()}.<span>+</span>
              </Component.Link>
            </li>
          )}
        </ul>
      )}
    </>
  );

  if (subItems) {
    return <article className={styles.card}>{cardInners}</article>;
  }

  return (
    <article>
      <Component.Link href={route} className={styles.card}>
        {cardInners}
      </Component.Link>
    </article>
  );
}
