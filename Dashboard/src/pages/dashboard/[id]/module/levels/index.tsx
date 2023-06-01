import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getDocumentation, getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { Component } from '@lyttledev-dashboard/components';
import { useEffect, useState } from 'react';
import { CardSettings } from '@lyttledev-dashboard/components/settings';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { ContentConfigs } from '@lyttledev-dashboard/utils/get-config';

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

const VarLevelUp = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsEventLevelUp,
);

function Page() {
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const title = usePage(pagesPrefix + 'module.levels.title');
  const msgLevelUp = getDocumentation('Activity.levels.event.level-up');

  useEffect(() => {
    setSettings([
      {
        id: '1',
        title: msgLevelUp.title,
        enabled: { state: true, key: 'moduleLevelsActive' },
        description: msgLevelUp.description,
        subItems: [
          {
            type: SettingCardSubItems.Input,
            key: 'Activity.levels.event.level-up',
            value: '',
            variables: VarLevelUp,
          },
        ],
      },
      {
        id: '1',
        title: 'Level up',
        enabled: { state: false, key: 'moduleLevels2Active' },
        description: 'Enable or disable the level up module.',
        subItems: [
          {
            type: SettingCardSubItems.Input,
            key: 'Activity.levels.txt.nickname',
            value: 'Hello world here',
            variables: [],
          },
        ],
      },
    ]);
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
