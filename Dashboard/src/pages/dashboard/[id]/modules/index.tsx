import { Layout } from '@lyttledev-dashboard/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { Component } from '@lyttledev-dashboard/components';
import { CardModules } from '@lyttledev-dashboard/components/modules';

const modules: CardModules = [
  {
    active: true,
    route: '/',
    onClick: (...e) => console.log(e),
    id: '5',
    setup: true,
    title: 'Leveling',
    description:
      'When enabled, members can level up by participating in the server.',
    subItems: [
      {
        id: '1',
        route: '/',
        active: true,
        title: 'Announcement',
        description: 'The channel were announcements are sent in',
      },
      {
        id: null,
        route: '/',
        active: false,
        title: 'Leaderboard',
        description: 'The channel were the leaderboard is sent in',
      },
    ],
  },
  {
    active: true,
    route: '/',
    onClick: (...e) => console.log(e),
    id: '5',
    setup: true,
    title: 'Hello',
    description: 'World!',
    subItems: [
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item',
        id: '1',
        route: '/',
        title: 'Sub Item',
      },
      {
        active: true,
        description: 'Sub Item 2',
        id: '1',
        route: '/',
        title: 'Sub Itemmmmmmmmmmmmmmm',
      },
    ],
  },
  {
    active: false,
    route: '/',
    onClick: (...e) => console.log(e),
    id: null,
    setup: false,
    title: 'Hello',
    description: 'World!',
  },
  {
    active: false,
    route: '/',
    onClick: (...e) => console.log(e),
    id: null,
    setup: true,
    title: 'Hello',
    description: 'World!',
    subItems: [],
  },
];

function Page() {
  const router = useRouter();
  const app = useApp();
  const [guildId, setGuildId] = useState<string | null>(null);

  // Set selected guild id from router, on initial load
  useEffect(() => {
    const _guildId = router.query.id;
    if (app?.selectedGuildId === _guildId) return;
    if (typeof _guildId !== 'string') return;
    app?.setSelectedGuildId(_guildId);
  }, []);

  // Update selected guild id from context
  useEffect(() => {
    // Get the id.
    const id = app?.selectedGuildId ?? null;
    // Check id against current id
    if (id === guildId) return;
    // Update id
    setGuildId(id);
  }, [app?.selectedGuildId, guildId, setGuildId]);

  return (
    <Component.Container>
      <Component.Modules modules={modules} />
    </Component.Container>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
