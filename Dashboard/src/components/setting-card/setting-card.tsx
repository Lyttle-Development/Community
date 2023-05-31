import { Component, componentsPrefix } from '@lyttledev-dashboard/components';
import styles from './setting-card.module.scss';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';
import { getMessage } from '@lyttledev-dashboard/utils';
import { IconButtonIcons } from '@lyttledev-dashboard/components/icon-button';
import { Change, useApp } from '@lyttledev-dashboard/contexts/App.context';

interface SettingCardItem {
  id: string | null;
  title: string;
  selectItems?: { key: string; value: string }[];
  selectKey?: string;
  selectTitle?: string;
  selectValue?: string;
}

export interface SettingCardProps {
  id: string | null;
  title: string;
  description?: string;
  extendable?: boolean;
  active?: boolean;
  activeKey?: string;
  textarea?: boolean;
  textareaValue?: string;
  textareaKey?: string;
  textareaDefaultKey?: string;
  subItems?: SettingCardItem[];
}

export function SettingCard({
  title,
  description,
  active,
  activeKey,
  textarea,
  textareaKey,
  subItems,
  id,
  extendable = false,
}: SettingCardProps) {
  const app = useApp();
  const changes = app?.changes ?? {};
  const change = (initial: Change, key: string, value: Change) => {
    if (value === initial) {
      app?.removeChange(key);
      return;
    }
    app?.updateChange(key, value);
  };

  // Check if the module is set up.
  const setup = id !== null;

  const pfx = componentsPrefix + 'module-card.';
  const msgTitlePrefix = getMessage(pfx + 'title-prefix');
  const msgSetupButton = getMessage(pfx + 'setup-button');

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {active !== undefined && activeKey !== undefined && setup && (
          <Component.LightSwitch
            active={(changes[activeKey] as boolean) ?? active}
            onClick={(e) => change(active, activeKey, e)}
            color={SCSSPrimaryColors.yellow}
            className={styles['switch']}
          />
        )}
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
                      href={item.route}
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
                href={route}
                className={`${styles['sub-item']} ${styles['sub-item--add']} ${styles['sub-item__link']}`}
              >
                Add a new {title.toLowerCase()}.<span>+</span>
              </Component.Link>
            </li>
          )}
        </ul>
      )}
    </article>
  );
}
