import { Layout } from '@lyttledev-dashboard/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';
import { Component } from '@lyttledev-dashboard/components';
import { CardModules } from '@lyttledev-dashboard/components/modules';
import { getLevelsConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/levels/_levels.config';
import { getBirthdaysConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/birthdays/_birthdays.config';
import { getDynamicVoiceConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/dynamic-voice/_dynamic-voice.config';
import { getVoiceTopicsConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/voice-topics/_voice-topics.config';

function Page() {
  const router = useRouter();
  const app = useApp();
  const [guildId, setGuildId] = useState<string | null>(null);
  const [modules, setModules] = useState<CardModules>([]);

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

    if (typeof id !== 'string') return;

    // Get modules
    setModules([
      getLevelsConfig(id),
      getBirthdaysConfig(id),
      getDynamicVoiceConfig(id),
      getVoiceTopicsConfig(id),
    ]);
  }, [app?.selectedGuildId, guildId, setGuildId]);

  return (
    <Component.Container>
      <Component.Modules modules={modules} />
    </Component.Container>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
