import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { ModuleCardItem } from '@lyttledev-dashboard/components/module-card';
import { useEffect, useState } from 'react';
import { CardSettings } from '@lyttledev-dashboard/components/settings';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { CreateSettingCard } from '@lyttledev-dashboard/components/setting-card';
import { Component } from '@lyttledev-dashboard/components';

interface VoiceTopicsChannel {
  id: string;
  title: string;
  active: boolean;
}

// Variables:
const pfx = pagesPrefix + 'module.voice-topics.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Card description:
const msgCardDescription = getMessage(pfx + 'card.description');

// Config:
export const getVoiceTopicsConfig = (
  guildId: string,
  moduleId: string | null = null,
  channels: VoiceTopicsChannel[] | null = null,
): CardModule => {
  const subItems =
    channels?.map(
      ({ id, title, active }: VoiceTopicsChannel): ModuleCardItem => ({
        id,
        route: `/dashboard/${guildId}/module/dynamic-voice#channel-${id}`,
        description: msgCardDescription,
        active,
        title: '#' + title,
      }),
    ) ?? [];

  return {
    active: null,
    title: msgTitle,
    description: msgDescription,
    extendable: true,
    id: moduleId,
    // Todo: Add voice topic disable function
    onClick: (...e) => console.log(e),
    route: `/dashboard/${guildId}/module/voice-topics`,
    subItems,
  };
};

function Page() {
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const title = usePage(pagesPrefix + 'module.levels.title');

  useEffect(() => {
    const settingsChannels = new CreateSettingCard()
      .id('0')
      .title('Channels')
      .description('Whather')
      .enabled(false, 'eeeee')
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key('test')
            .title('Channel')
            .value('')
            .single(false)
            .options([
              {
                key: { title: 'General', description: '#off-topic' },
                value: '0',
              },
              { key: { title: 'General', description: '#roles' }, value: '1' },
              {
                key: { title: 'Voice Channels', description: '#select-vc' },
                value: '2',
              },
              {
                key: { title: 'Voice Channels', description: '#no-mic' },
                value: '3',
              },
              {
                key: { title: 'Voice Channels', description: '#commands' },
                value: '4',
              },
              // { key: '1', value: '1' },
              // { key: '2', value: '2' },
              // { key: '3', value: '3' },
              // { key: '4', value: '4' },
              // { key: '5', value: '5' },
              // { key: '6', value: '6' },
              // { key: '7', value: '7' },
            ]),
        ),
      )
      .build();

    setSettings([settingsChannels]);
  }, []);

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        {settings !== null && (
          <Component.Settings settings={settings}></Component.Settings>
        )}
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
