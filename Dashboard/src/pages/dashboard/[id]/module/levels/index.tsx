import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getDocumentation, getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { Component } from '@lyttledev-dashboard/components';
import { useEffect, useState } from 'react';
import { CardSettings } from '@lyttledev-dashboard/components/settings';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { ContentConfigs } from '@lyttledev-dashboard/utils/get-config';
import { CreateSettingCard } from '@lyttledev-dashboard/components/setting-card';

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

// Config:
export const getLevelsConfig = (
  guildId: string,
  enabled = false,
  levelsId: string | null = null,
  nicknameId: string | null = null,
  nicknameActive = false,
  announcementId: string | null = null,
  announcementActive = false,
  leaderboardId: string | null = null,
  leaderboardActive = false,
): CardModule => ({
  active: enabled,
  title: msgTitle,
  description: msgDescription,
  id: levelsId,
  // Todo: Add levels disable function
  onClick: (...e) => console.log(e),
  route: `/dashboard/${guildId}/module/levels`,
  subItems: [
    {
      id: nicknameId,
      route: `/dashboard/${guildId}/module/levels#nickname`,
      active: nicknameActive,
      title: msgNicknameTitle,
      description: msgNicknameDescription,
    },
    {
      id: announcementId,
      route: `/dashboard/${guildId}/module/levels#announcement`,
      active: announcementActive,
      title: msgAnnouncementTitle,
      description: msgAnnouncementDescription,
    },
    {
      id: leaderboardId,
      route: `/dashboard/${guildId}/module/levels#leaderboard`,
      active: leaderboardActive,
      title: msgLeaderboardTitle,
      description: msgLeaderboardDescription,
    },
  ],
});

const getVariables = (
  module: any,
): {
  variable: string;
  description: string;
}[] => {
  const variables = (module?.variables as string[]) ?? [];
  return variables.map((variable) => ({
    variable: variable,
    description: 'No description provided.',
  }));
};

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
      .enabled(false, keyLevelUp + '.enabled')
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key('test')
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
            .key(keyLevelUp)
            .variables(varLevelUp),
        ),
      )
      .build();

    const settingNickname = new CreateSettingCard()
      .id('0')
      .title(msgNickname.title)
      .description(msgNickname.description)
      .enabled(false, keyNickname + '.enabled')
      .addSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(keyNickname)
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
