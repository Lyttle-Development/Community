import { Layout } from '@lyttledev-dashboard/layouts';
import { useEffect, useState } from 'react';
import { Component } from '@lyttledev-dashboard/components';
import { CardModules } from '@lyttledev-dashboard/components/modules';
import { getLevelsConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/levels';
import { getBirthdaysConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/birthdays';
import { getDynamicVoiceConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/dynamic-voice';
import { getVoiceTopicsConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/voice-topics';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { pagesPrefix } from '@lyttledev-dashboard/pages';

function Page() {
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'modules.title');
  const [modules, setModules] = useState<CardModules>([]);

  // Update selected guild id from context
  useEffect(() => {
    if (guildId === null) return;

    // Get modules
    setModules([
      getLevelsConfig(guildId),
      getBirthdaysConfig(guildId),
      getDynamicVoiceConfig(guildId),
      getVoiceTopicsConfig(guildId),
    ]);
  }, [guildId]);

  return (
    <Component.Container>
      <Component.Title>{title}</Component.Title>
      {guildId !== null && <Component.Modules modules={modules} />}
    </Component.Container>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
