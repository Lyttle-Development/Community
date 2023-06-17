import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useEffect } from 'react';
import { Servers } from '@lyttledev-dashboard/components/server-card';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { gql, useLazyQuery } from '@apollo/client';

const mockups = 50;
const mockupServers: Servers = [];
for (let i = 0; i < mockups; i++) {
  mockupServers.push({
    id: '0',
    name: 'Loading Servers!',
    icon: '/media/images/placeholder.png',
    setup: false,
    active: null,
    members: 0,
    staffMembers: 0,
    modulesEnabled: 0,
  });
}

const DashboardQuery = gql`
  query {
    discord {
      dashboardUserGuilds
    }
  }
`;

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'dashboard.title');
  const [fetch, { data }] = useLazyQuery(DashboardQuery);

  useEffect(() => {
    if (authorized && guildId) {
      void fetch();
    }
  }, [authorized, guildId]);

  if (!authorized) return null;

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.ServerCardGrid
          servers={data?.discord?.dashboardUserGuilds ?? mockupServers}
        />
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
