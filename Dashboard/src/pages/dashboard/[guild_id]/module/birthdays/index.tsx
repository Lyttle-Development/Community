import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import {
  getDocumentation,
  getMessage,
  getVariables,
} from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { Component } from '@lyttledev-dashboard/components';
import { useEffect, useState } from 'react';
import { CardSettings } from '@lyttledev-dashboard/components/settings';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { ContentConfigs } from '@lyttledev-dashboard/utils/get-config';
import { CreateSettingCard } from '@lyttledev-dashboard/components/setting-card';
import { changeKeys } from '@lyttledev-dashboard/components/review';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { gql, useLazyQuery } from '@apollo/client';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { getChannelOptions } from '@lyttledev-dashboard/utils/get-channel-options';
import { findTranslation } from '@lyttledev-dashboard/utils/find-translation';

// Variables:
const pfx = pagesPrefix + 'module.birthdays.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Announcement:
const msgAnnouncementTitle = getMessage(pfx + 'announcement.title');
const msgAnnouncementDescription = getMessage(pfx + 'announcement.description');

export interface GetLevelsConfigProps {
  guildId: string;
  enabled: boolean;
  announcementChannelId: string | null;
}

// Config:
export function getBirthdaysConfig({
  guildId,
  enabled,
  announcementChannelId = null,
}: GetLevelsConfigProps): CardModule {
  const announcementActive =
    typeof announcementChannelId === 'string' ? true : null;

  const announcementKey = announcementActive
    ? changeKeys.moduleBirthdayChannel.key
    : null;

  const setup = !(!enabled && !announcementActive);

  return {
    active: enabled,
    title: msgTitle,
    description: msgDescription,
    id: setup ? changeKeys.moduleBirthday.key : null,
    route: `/dashboard/${guildId}/module/birthdays`,
    subItems: [
      {
        id: announcementKey,
        route: `/dashboard/${guildId}/module/birthdays#announcement`,
        active: announcementActive,
        title: msgAnnouncementTitle,
        description: msgAnnouncementDescription,
      },
    ],
  };
}

// Level up
const keyBday = 'Activity.birth-day.txt.announcement';
const msgBday = getDocumentation(keyBday);
const varBday = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsEventLevelUp,
);

const birthdayQuery = gql`
  query GetBirthday($guildId: String!) {
    guild(id: $guildId) {
      guildId
      moduleBirthday {
        enabled
        birthdayChannelId
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

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'module.levels.title');
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const [fetch, { data }] = useLazyQuery(birthdayQuery);

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

    const settingBday = new CreateSettingCard()
      .id('0')
      .title(msgBday.title)
      .description(msgBday.description)
      .enabled(
        data?.guild?.moduleBirthday?.enabled ?? false,
        changeKeys.moduleBirthday.key,
      )
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleBirthdayChannel.key)
            .title('Channel') // Todo: Translate
            .value(data?.guild?.moduleBirthday?.birthdayChannelId)
            .options(
              getChannelOptions(
                data?.guild?.discord?.guildChannels ?? [],
                data?.guild?.discord?.guildTextChannels ?? [],
              ),
            ),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((textarea) =>
          textarea //
            .key(changeKeys.moduleBirthdayText.key)
            .value(findTranslation(data?.guild?.translations, keyBday))
            .defaultKey(keyBday)
            .variables(varBday),
        ),
      )
      .build();

    setSettings([settingBday]);
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
