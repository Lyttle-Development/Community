import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './module-card.module.scss';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { Icons } from '@lyttledev-dashboard/components/icon';

export interface ModuleCardItem {
  id: string | null;
  route: string;
  title: string;
  description: string;
  active: boolean | null;
  setupMsg?: string;
}

export interface ModuleCardProps extends ModuleCardItem {
  extendable?: boolean;
  subItems?: ModuleCardItem[];
}

export function ModuleCard({
  title,
  description,
  route,
  active,
  subItems,
  id,
  extendable = false,
}: ModuleCardProps) {
  // Check if the module is set up.
  const setup = id !== null;
  const app = useApp();
  const changes = app?.changes ?? {};

  const onClick = (
    initial: boolean | null,
    key: string | null,
    value: boolean,
  ) => {
    if (!key || !initial) return;
    app?.change({
      update: {
        key,
        value,
        initial,
      },
    });
  };

  const pfx = componentsPrefix + 'module-card.';
  const msgTitlePrefix = getMessage(pfx + 'title-prefix');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  const cardInners = (
    <>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          {msgTitlePrefix} {title}
        </h2>
        <div className={styles['heading__actions']}>
          {active !== null && setup && (
            <Component.LightSwitch
              active={(changes[id]?.current as boolean) ?? active}
              onClick={(e) => onClick(active, id, e)}
              color={SCSSPrimaryColors.yellow}
              className={styles['switch']}
            />
          )}
          {setup && (
            <Component.IconButton
              icon={Icons.cog}
              className={styles['cog']}
              href={route}
            />
          )}
          {active !== null && !setup && (
            <Component.Button
              color={ButtonColors.yellow}
              href={route}
              className={styles['setup-button']}
            >
              {msgSetupButton}
            </Component.Button>
          )}
        </div>
      </div>
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
                  {item.id !== null && item.active !== null && (
                    <>
                      <Component.LightSwitch
                        active={
                          (changes[item.id]?.current as boolean) ??
                          item.active ??
                          false
                        }
                        onClick={(e) => onClick(item.active, item.id, e)}
                        className={styles['sub-item__switch']}
                        color={SCSSPrimaryColors.yellow}
                      />
                      <Component.IconButton
                        icon={Icons.cog}
                        className={styles['sub-item__cog']}
                        href={item.route}
                      />
                    </>
                  )}
                  {item.id === null && (
                    <Component.Button
                      color={ButtonColors.yellow}
                      href={item.route}
                      className={styles['sub-item__setup-button']}
                    >
                      {item.setupMsg ?? msgSetupButton}
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
                href={route}
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
