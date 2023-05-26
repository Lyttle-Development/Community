import { Layout } from '@lyttledev-dashboard/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

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

  return <p>Hiii {guildId}</p>;
}

Page.getLayout = Layout.getDefault;

export default Page;
