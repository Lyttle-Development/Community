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

// Variables:
const pfx = pagesPrefix + 'module.levels.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Nickname:
const msgNicknameTitle = getMessage(pfx + 'nickname.title');
const msgNicknameDescription = getMessage(pfx + 'nickname.description');

// Announcement:
const msgAnnouncementTitle = getMessage(pfx + 'announcement.title');
const msgAnnouncementDescription = getMessage(pfx + 'announcement.description');

// Leaderboard:
const msgLeaderboardTitle = getMessage(pfx + 'leaderboard.title');
const msgLeaderboardDescription = getMessage(pfx + 'leaderboard.description');

export interface GetLevelsConfigProps {
  guildId: string;
  enabled: boolean;
  nicknameActive: boolean;
  announcementId: string | null;
  leaderboardId: string | null;
}

// Config:
export function getLevelsConfig({
  guildId,
  enabled,
  nicknameActive,
  announcementId,
  leaderboardId,
}: GetLevelsConfigProps): CardModule {
  const nicknameKey = nicknameActive
    ? changeKeys.modulesLevelsNickname.key
    : null;

  const announcementActive = typeof announcementId === 'string';
  const announcementKey = announcementActive
    ? changeKeys.modulesLevelsAnnouncement.key
    : null;

  const leaderboardActive = typeof leaderboardId === 'string';
  const leaderboardKey = leaderboardActive
    ? changeKeys.modulesLevelsLeaderboard.key
    : null;

  return {
    active: enabled,
    title: msgTitle,
    description: msgDescription,
    id: changeKeys.modulesLevels.key,
    route: `/dashboard/${guildId}/module/levels`,
    subItems: [
      {
        id: nicknameKey,
        route: `/dashboard/${guildId}/module/levels#nickname`,
        active: nicknameActive,
        title: msgNicknameTitle,
        description: msgNicknameDescription,
      },
      {
        id: announcementKey,
        route: `/dashboard/${guildId}/module/levels#announcement`,
        active: announcementActive,
        title: msgAnnouncementTitle,
        description: msgAnnouncementDescription,
      },
      {
        id: leaderboardKey,
        route: `/dashboard/${guildId}/module/levels#leaderboard`,
        active: leaderboardActive,
        title: msgLeaderboardTitle,
        description: msgLeaderboardDescription,
      },
    ],
  };
}

// Level up
const keyLevelUp = 'Activity.levels.event.level-up';
const msgLevelUp = getDocumentation(keyLevelUp);
const varLevelUp = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsEventLevelUp,
);

// Level up
const keyNickname = 'Activity.levels.txt.nickname';
const msgNickname = getDocumentation(keyNickname);
const varNickname = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsTxtNickname,
);

function Page() {
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const title = usePage(pagesPrefix + 'module.levels.title');

  useEffect(() => {
    const settingLevelUp = new CreateSettingCard()
      .id('0')
      .title(msgLevelUp.title)
      .description(msgLevelUp.description)
      .enabled(false, changeKeys.moduleLevelLevelUp.key)
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleLevelLevelUpChannel.key)
            .title('Channel')
            .value('')
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
      .addSubItem((subItem) =>
        subItem.textarea((textarea) =>
          textarea //
            .key(changeKeys.moduleLevelLevelUpText.key)
            .value(
              'Wow\nSooo many\nlines!\nis this real?\nwhoep\noep!Yeyeyeye\nLol....',
            )
            .defaultKey(keyLevelUp)
            .variables(varLevelUp),
        ),
      )
      .build();

    const settingNickname = new CreateSettingCard()
      .id('0')
      .title(msgNickname.title)
      .description(msgNickname.description)
      .enabled(true, changeKeys.moduleLevelNickname.key)
      .addSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.moduleLevelNicknameText.key)
            .defaultKey(keyNickname)
            .variables(varNickname),
        ),
      )
      .build();

    setSettings([settingLevelUp, settingNickname]);
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
