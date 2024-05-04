import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { logout } from '@lyttledev-dashboard/hooks/useAuth';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

export const pagesPrefix = dashboardPrefix + 'pages.';

function Page() {
  const app = useApp();
  const pfx = pagesPrefix + 'logout.';
  const title = usePage(pfx + 'title');
  const msgTitle = getMessage(pfx + 'landing-title');
  const msgDescription = getMessage(pfx + 'landing-description');
  const msgLogout = getMessage(pfx + 'logout-button');
  const msgBack = getMessage(pfx + 'back-button');

  const openLogout = () => {
    localStorage.clear();
    app?.setSelectedGuildId(null);
    logout();
  };

  const openGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <section className={styles.landing}>
          <h2>{msgTitle}</h2>
          <p className={styles.description}>{msgDescription}</p>
          <ul className={styles.buttons}>
            <li>
              <Component.Button text={msgLogout} onClick={openLogout} noUpper />
            </li>
            <li>
              <Component.Button
                text={msgBack}
                onClick={openGoBack}
                noUpper
                color={ButtonColors.secondary}
              />
            </li>
          </ul>
        </section>
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
