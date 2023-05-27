import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './module-card.module.scss';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { getMessage } from '@lyttledev-dashboard/utils';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';

interface ModuleCardItem {
  id: string | null;
  route: string;
  title: string;
  description: string;
  active: boolean | null;
}

export interface ModuleCardProps extends ModuleCardItem {
  extendable?: boolean;
  subItems?: ModuleCardItem[];
  onClick: (subItem: boolean, id: string | null, active: boolean) => void;
}

export function ModuleCard({
  title,
  description,
  route,
  active,
  onClick,
  subItems,
  id,
  extendable = false,
}: ModuleCardProps) {
  // Check if the module is set up.
  const setup = id !== null;

  const pfx = componentsPrefix + 'module-card.';
  const msgTitlePrefix = getMessage(pfx + 'title-prefix');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  const cardInners = (
    <>
      {active !== null && setup && (
        <Component.LightSwitch
          active={active}
          onClick={() => onClick(false, id, !active)}
          color={SCSSPrimaryColors.yellow}
          className={styles['switch']}
        />
      )}
      {setup && (
        <Component.IconButton
          icon={IconButtonIcons.cog}
          className={styles['cog']}
          href={route}
        />
      )}
      {!setup && (
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
      <Component.Markdown className={styles.description}>
        {description}
      </Component.Markdown>
      {subItems && (
        <ul className={styles['sub-items']}>
          {subItems.length > 0 &&
            subItems.map((item, i) => (
              <li key={i}>
                <Component.Link
                  href={item.route}
                  className={styles['sub-item']}
                >
                  {item.id !== null && (
                    <>
                      <Component.LightSwitch
                        active={item.active ?? false}
                        onClick={() => onClick(true, item.id, !item.active)}
                        className={styles['sub-item__switch']}
                        color={SCSSPrimaryColors.yellow}
                      />
                      <Component.IconButton
                        icon={IconButtonIcons.cog}
                        className={styles['sub-item__cog']}
                        href={item.route}
                      />
                    </>
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
