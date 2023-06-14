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

// Variables:
const pfx = pagesPrefix + 'module.birthdays.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Announcement:
const msgAnnouncementTitle = getMessage(pfx + 'announcement.title');
const msgAnnouncementDescription = getMessage(pfx + 'announcement.description');

// Config:
export const getBirthdaysConfig = (
  guildId: string,
  moduleId: string | null = null,
  announcementChannelId: string | null = null,
): CardModule => ({
  active: null,
  title: msgTitle,
  description: msgDescription,
  id: moduleId,
  route: `/dashboard/${guildId}/module/birthdays`,
  subItems: [
    {
      id: announcementChannelId,
      route: `/dashboard/${guildId}/module/birthdays#announcement`,
      active: true,
      title: msgAnnouncementTitle,
      description: msgAnnouncementDescription,
    },
  ],
});

// Level up
const keyBday = 'Activity.birth-day.txt.announcement';
const msgBday = getDocumentation(keyBday);
const varBday = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsEventLevelUp,
);

function Page() {
  useGuild();
  const title = usePage(pagesPrefix + 'module.levels.title');
  const [settings, setSettings] = useState<CardSettings | null>(null);

  useEffect(() => {
    const settingBday = new CreateSettingCard()
      .id('0')
      .title(msgBday.title)
      .description(msgBday.description)
      .enabled(false, changeKeys.moduleBirthday.key)
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleBirthdayChannel.key)
            .title('Channel')
            .value('')
            .options([
              {
                // todo; get real channels?!
                key: { title: 'General', description: '#off-topic' },
                value: '0',
              },
              { key: { title: 'General', description: '#roles' }, value: '1' },
            ]),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((textarea) =>
          textarea //
            .key(changeKeys.moduleBirthdayText.key)
            .defaultKey(keyBday)
            .variables(varBday),
        ),
      )
      .build();

    setSettings([settingBday]);
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
