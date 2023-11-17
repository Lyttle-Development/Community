import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

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
            <Component.ServerCardGrid
              servers={data?.discord?.dashboardUserGuilds}
            />
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
