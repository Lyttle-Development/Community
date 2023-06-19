import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { Constants } from '@lyttledev-dashboard/constants';

export const pagesPrefix = dashboardPrefix + 'pages.';

function Page() {
  const pfx = pagesPrefix + 'home.';
  const title = usePage(pfx + 'title');
  const msgTitle = getMessage(pfx + 'landing-title');
  const msgDescription = getMessage(pfx + 'landing-description');
  const msgAdd = getMessage(pfx + 'add-button');
  const msgJoin = getMessage(pfx + 'join-button');

  const openInvite = () => {
    window.open('https://discord.gg/QfqFFPFFQZ', '_blank');
  };
  const openAdd = () => {
    window.location.href = Constants.inviteBotUrl;
  };

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <section className={styles.landing}>
          <Component.Logo className={styles.logo} />
          <h2>{msgTitle}</h2>
          <p className={styles.description}>{msgDescription}</p>
          <ul className={styles.buttons}>
            <li>
              <Component.Button text={msgAdd} onClick={openAdd} noUpper />
            </li>
            <li>
              <Component.Button
                text={msgJoin}
                onClick={openInvite}
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
