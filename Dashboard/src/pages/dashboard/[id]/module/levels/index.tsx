import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';

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

function Page() {
  return <>Hiii</>;
}

Page.getLayout = Layout.getDefault;

export default Page;
