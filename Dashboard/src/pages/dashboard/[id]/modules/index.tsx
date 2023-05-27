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
        title: 'Nicknames',
        description:
          'Set a nickname for every active user with their level in it.',
      },
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
    title: 'Dynamic Voice Channels',
    description:
      'Add an "master" channel which dynamically creates new channels based on its (and its childs) usage.',
    extendable: true,
    subItems: [
      {
        id: '1',
        active: true,
        title: '#Kneeg Room',
        description:
          'This channel is configured to dynamically grow based on its usage.',
        route: '/',
      },
    ],
  },
  {
    active: true,
    route: '/',
    onClick: (...e) => console.log(e),
    id: '5',
    setup: true,
    title: 'Voice Topics',
    description:
      'A textchannel with a button for members to create a voice channel with a topic.',
    extendable: true,
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
