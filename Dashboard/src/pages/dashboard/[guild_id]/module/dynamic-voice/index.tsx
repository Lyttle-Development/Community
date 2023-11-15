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
import { gql, useLazyQuery } from '@apollo/client';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { getChannelOptions } from '@lyttledev-dashboard/utils/get-channel-options';
import { changeKeys } from '@lyttledev-dashboard/components/review';

interface DynamicVoiceChannel {
  id: string;
  title: string;
  active: boolean;
}

// Variables:
const pfx = pagesPrefix + 'module.dynamic-voice.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Card description:
const msgCardDescription = getMessage(pfx + 'card.description');

// Config:
export const getDynamicVoiceConfig = (
  guildId: string,
  moduleId: string | null = null,
  channels: DynamicVoiceChannel[] | null = null,
): CardModule => {
  const subItems =
    channels?.map(
      ({ id, title, active }: DynamicVoiceChannel): ModuleCardItem => ({
        id,
        route: `/dashboard/${guildId}/module/dynamic-voice#channel-${id}`,
        description: msgCardDescription,
        active: null,
        title: '#' + title,
      }),
    ) ?? [];

  return {
    active: null,
    title: msgTitle,
    description: msgDescription,
    extendable: true,
    id: moduleId,
    route: `/dashboard/${guildId}/module/dynamic-voice`,
    subItems,
  };
};

const dyanmicVoiceQuery = gql`
  query GetDynamicVoices($guildId: String!) {
    guild(id: $guildId) {
      guildId
      moduleVoiceGrowth {
        enabled
        channelId
        manual
      }
      translations {
        key
        value
      }
      discord {
        guildChannels
        guildVoiceChannels
      }
    }
  }
`;

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'module.levels.title');
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const [fetch, { data }] = useLazyQuery(dyanmicVoiceQuery);

  useEffect(() => {
    if (!authorized || !guildId) return;
    if (!data) {
      void fetch({ variables: { guildId } });
      return;
    }
    if (data?.guild?.guildId !== guildId) {
      void fetch({ variables: { guildId } });
      return;
    }

    const guildVoiceTopics = (data?.guild?.moduleVoiceGrowth ?? [])
      .filter(({ manual }: { manual: boolean }) => !manual)
      .filter(({ enabled }: { enabled: boolean }) => enabled);

    const channels = data?.guild?.discord?.guildVoiceChannels ?? [];

    const guildVoiceTopicsChannelIds = guildVoiceTopics.map(
      ({ channelId }: { channelId: string }) => channelId,
    );

    const settingsChannels = new CreateSettingCard()
      .id('0')
      .title('Channels')
      .description('xx')
      .addSubItem((subItem) => {
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleDynamicVoiceChannels.key)
            .title('Voice Channel')
            .values(guildVoiceTopicsChannelIds)
            .single(false)
            .flex(true)
            .options(
              getChannelOptions(
                data?.guild?.discord?.guildChannels ?? [],
                channels,
              ),
            ),
        );
        return subItem;
      })
      .build();

    setSettings([settingsChannels]);
  }, [authorized, guildId, data]);

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
