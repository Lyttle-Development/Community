import { CardModule } from '@lyttledev-dashboard/components/modules';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getMessage } from '@lyttledev-dashboard/utils';

// Variables:
const pfx = pagesPrefix + 'module.birthdays.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Announcement:
const msgAnnouncementTitle = getMessage(pfx + 'announcement.title');
const msgAnnouncementDescription = getMessage(pfx + 'announcement.description');

// Config:
export const getBirthdaysConfig = (guildId: string): CardModule => ({
  active: null,
  title: msgTitle,
  description: msgDescription,
  id: null,
  // Todo: Add birthday disable function
  onClick: (...e) => console.log(e),
  route: `/dashboard/${guildId}/module/birthdays`,
  subItems: [
    {
      id: null,
      route: `/dashboard/${guildId}/module/birthdays#announcement`,
      active: true,
      title: msgAnnouncementTitle,
      description: msgAnnouncementDescription,
    },
  ],
});
