import { useEffect, useState } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { useRouter } from 'next/router';

export function useGuild(): string | null {
  const app = useApp();
  const router = useRouter();
  const [guildId, setGuildId] = useState<string | null>(null);

  // Set selected guild id from router, on initial load
  useEffect(() => {
    const _guildId = router?.query?.guild_id;
    if (app?.selectedGuildId === _guildId) return;
    if (typeof _guildId !== 'string') return;
    app?.setSelectedGuildId(_guildId);
  }, [router?.query?.guild_id]);

  // Update selected guild id from context
  useEffect(() => {
    // Get the id.
    const id = app?.selectedGuildId ?? null;
    // Check id against current id
    if (id === guildId) return;
    // Update id
    setGuildId(id);
  }, [app?.selectedGuildId, guildId, setGuildId]);

  return guildId;
}
