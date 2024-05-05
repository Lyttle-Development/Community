import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { getMessage } from '@lyttledev-dashboard/utils';

const DashboardQuery = gql`
  query {
    discord {
      dashboardUserGuilds
    }
  }
`;

function Page() {
  const authorized = useAuth();
  const title = usePage(pagesPrefix + 'dashboard.title');
  const msgNoServers = getMessage(pagesPrefix + 'dashboard.no-servers');
  const [fetch, { data }] = useLazyQuery(DashboardQuery);

  useEffect(() => {
    if (authorized) {
      void fetch();
    }
  }, [authorized]);

  if (!authorized) return null;

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Layout.Transition>
          {data?.discord?.dashboardUserGuilds ? (
            <>
              {data?.discord?.dashboardUserGuilds?.length > 0 ? (
                <Component.ServerCardGrid
                  servers={data?.discord?.dashboardUserGuilds}
                />
              ) : (
                <a href={'https://discord.com/app'} target={'_blank'}>
                  {msgNoServers}
                </a>
              )}
            </>
          ) : (
            <Component.ServerCardDummyGrid />
          )}
        </Layout.Transition>
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
