import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import {
  getDocumentation,
  getMessage,
  getVariables,
} from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { ModuleCardItem } from '@lyttledev-dashboard/components/module-card';
import { useEffect, useState } from 'react';
import { CardSettings } from '@lyttledev-dashboard/components/settings';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { CreateSettingCard } from '@lyttledev-dashboard/components/setting-card';
import { Component } from '@lyttledev-dashboard/components';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { getChannelOptions } from '@lyttledev-dashboard/utils/get-channel-options';
import { changeKeys } from '@lyttledev-dashboard/components/review';
import { findTranslation } from '@lyttledev-dashboard/utils/find-translation';
import { ContentConfigs } from '@lyttledev-dashboard/utils/get-config';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks';

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
        route: `/servers/${guildId}/module/voice-topics#channel-${id}`,
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
    route: `/servers/${guildId}/module/voice-topics`,
    subItems: [
      {
        id: null,
        route: `/servers/${guildId}/module/voice-topics#send-message`,
        description: msgCardDescription,
        active: null,
        title: 'Send Message in Channel',
        setupMsg: 'Message',
      },
      ...subItems,
    ],
  };
};

const voiceTopicsQuery = gql`
  query GetVoiceTopics($guildId: String!) {
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
        guildTextChannels
      }
    }
  }
`;

const createVoiceTopicsMutation = gql`
  mutation CreateVoiceTopicMessage($values: String!, $guildId: String!) {
    createGuildAction(
      createGuildActionInput: {
        key: "createVoiceTopicChannel"
        values: $values
        executed: false
        guildId: $guildId
      }
    ) {
      id
    }
  }
`;

const keySendChannelMessage = 'Activity.dynamic-voice.txt.send-message';
const msgSendChannelMessage = getDocumentation(keySendChannelMessage);
const varSendChannelMessage = getVariables(
  ContentConfigs.ModuleConfigGlobalVariables,
);

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'module.levels.title');
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const [fetch, { data }] = useLazyQuery(voiceTopicsQuery);
  const [createVoiceTopicMessage] = useMutation(createVoiceTopicsMutation);

  const [message, setMessage] = useState<string | null>(null);

  const submitChannelMessage = (newData: Changes) => {
    const newChannel = newData['channel'];
    const newMessage = newData['message'] ?? {
      original: null,
      current: message,
      store: null,
    };

    if (!newChannel || !newChannel.current || newChannel.current === '') {
      const oldMessage = (newMessage?.current as string) ?? message ?? null;
      if (oldMessage !== message) setMessage(oldMessage);
      return;
    }

    if (message !== null) setMessage(null);
    void createVoiceTopicMessage({
      variables: {
        values: JSON.stringify([newChannel.current, newMessage.current]),
        guildId,
      },
    });
  };

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
      .filter(({ manual }: { manual: boolean }) => manual)
      .filter(({ enabled }: { enabled: boolean }) => enabled);

    const channels = data?.guild?.discord?.guildTextChannels ?? [];

    const guildVoiceTopicsChannelIds = guildVoiceTopics.map(
      ({ channelId }: { channelId: string }) => channelId,
    );

    const settingsMessage = new CreateSettingCard()
      .id('0')
      .title(msgSendChannelMessage.title)
      .description(msgSendChannelMessage.description)
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key('channel')
            .title('Text Channel')
            .values(guildVoiceTopicsChannelIds)
            .options(
              getChannelOptions(
                data?.guild?.discord?.guildChannels ?? [],
                channels.filter(({ id }: { id: string }) =>
                  guildVoiceTopicsChannelIds.includes(id),
                ),
              ),
            ),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((textarea) =>
          textarea //
            .key('message')
            .value(
              message ??
                findTranslation(
                  data?.guild?.translations,
                  keySendChannelMessage,
                ),
            )
            .defaultKey(keySendChannelMessage)
            .variables(varSendChannelMessage),
        ),
      )
      .isolate(true)
      .onSubmit(submitChannelMessage)
      .build();

    const settingsChannels = new CreateSettingCard()
      .id('1')
      .title('Channels')
      .description('xx')
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleVoiceTopicsChannels.key)
            .title('Text Channel')
            .values(guildVoiceTopicsChannelIds)
            .single(false)
            .flex(true)
            .options(
              getChannelOptions(
                data?.guild?.discord?.guildChannels ?? [],
                channels,
              ),
            ),
        ),
      )
      .build();

    setSettings([settingsMessage, settingsChannels]);
  }, [authorized, guildId, data, message]);

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
