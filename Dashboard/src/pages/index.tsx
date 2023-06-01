import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useEffect } from 'react';
import { ButtonColors } from '@lyttledev-dashboard/components/button';

export const pagesPrefix = dashboardPrefix + 'pages.';

function Page() {
  const app = useApp();
  const setPageTitle = app?.setPageTitle ?? ((p) => p);

  const pfx = pagesPrefix + 'home.';
  const title = getMessage(pfx + 'title');
  const msgTitle = getMessage(pfx + 'landing-title');
  const msgDescription = getMessage(pfx + 'landing-description');
  const msgAdd = getMessage(pfx + 'add-button');
  const msgJoin = getMessage(pfx + 'join-button');

  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <section className={styles.landing}>
        <Component.Logo className={styles.logo} />
        <h2>{msgTitle}</h2>
        <p className={styles.description}>{msgDescription}</p>
        <ul className={styles.buttons}>
          <li>
            <Component.Button text={msgAdd} href="" noUpper />
          </li>
          <li>
            <Component.Button
              text={msgJoin}
              href=""
              noUpper
              color={ButtonColors.secondary}
            />
          </li>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
