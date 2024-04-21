import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { Constants } from '@lyttledev-dashboard/constants';

export const pagesPrefix = dashboardPrefix + 'pages.';

function Page() {
  const pfx = pagesPrefix + 'login.';
  const title = usePage(pfx + 'title');
  const msgTitle = getMessage(pfx + 'landing-title');
  const msgDescription = getMessage(pfx + 'landing-description');
  const msgLogin = getMessage(pfx + 'login-button');
  const msgBack = getMessage(pfx + 'back-button');

  const openLogin = () => {
    const redirect = localStorage.getItem('redirect');
    if (redirect) {
      localStorage.removeItem('redirect');
      window.location.href = `${Constants.loginUrl}?redirect=${redirect}`;
      return;
    }
    window.location.href = Constants.loginUrl;
  };

  const openGoBack = () => {
    // Return back 2 times, to avoid going back to the login page
    window.history.back();
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
              <Component.Button text={msgLogin} onClick={openLogin} noUpper />
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
