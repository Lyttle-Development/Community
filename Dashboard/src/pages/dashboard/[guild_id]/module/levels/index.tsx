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
import { gql, useLazyQuery } from '@apollo/client';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { findTranslation } from '@lyttledev-dashboard/utils/find-translation';
import { NumberStyle } from '../../../../../../../Content/content/modules/Activity/levels/txt/nickname-numbers/levels/config';
import { SettingCardSelectItemOptions } from '@lyttledev-dashboard/components/setting-card/components/select';
import { getChannelOptions } from '@lyttledev-dashboard/utils/get-channel-options';

const levelsQuery = gql`
  query GetLevels($guildId: String!) {
    guild(id: $guildId) {
      guildId
      moduleLevel {
        enabled
        nicknames
        leaderboardChannelId
        announcementChannelId
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
    ? changeKeys.moduleLevelsNickname.key
    : null;

  const announcementActive = typeof announcementId === 'string';
  const announcementKey = announcementActive
    ? changeKeys.moduleLevelsAnnouncement.key
    : null;

  const leaderboardActive = typeof leaderboardId === 'string';
  const leaderboardKey = leaderboardActive
    ? changeKeys.moduleLevelsLeaderboard.key
    : null;

  const setup = !(
    !enabled &&
    !nicknameActive &&
    !announcementActive &&
    !leaderboardActive
  );

  return {
    active: enabled,
    title: msgTitle,
    description: msgDescription,
    id: setup ? changeKeys.modulesLevels.key : null,
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
      // {
      //   id: leaderboardKey,
      //   route: `/dashboard/${guildId}/module/levels#leaderboard`,
      //   active: leaderboardActive,
      //   title: msgLeaderboardTitle,
      //   description: msgLeaderboardDescription,
      // },
    ],
  };
}

// Level Module
const keyLevel = 'Dashboard.pages.module.levels.module';
const msgLevel = getDocumentation(keyLevel);

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

const keyNicknameLevels = 'Activity.levels.txt.nickname-numbers.levels';
const msgNicknameLevels = getMessage(keyNicknameLevels);

const keyNicknameRecentLevels =
  'Activity.levels.txt.nickname-numbers.recent-levels';
const msgNicknameRecentLevels = getMessage(keyNicknameRecentLevels);

const keyNicknamePoints = 'Activity.levels.txt.nickname-numbers.points';
const msgNicknamePoints = getMessage(keyNicknamePoints);

const keyNicknameRecentPoints =
  'Activity.levels.txt.nickname-numbers.recent-points';
const msgNicknameRecentPoints = getMessage(keyNicknameRecentPoints);

const keyCommand = 'Dashboard.pages.module.levels.command';
const msgCommand = getDocumentation(keyCommand);

const numberKeys = Object.keys(
  ContentConfigs.ModuleConfigActivityLevelsTxtNicknameNumbersLevels
    .NUMBER_TYPES,
) as NumberStyle[];
const numberOptions: SettingCardSelectItemOptions[] = numberKeys.map(
  (key: NumberStyle) => {
    const numbers =
      ContentConfigs.ModuleConfigActivityLevelsTxtNicknameNumbersLevels
        .NUMBER_TYPES[key];
    return {
      key: numbers.join(''),
      value: key,
    };
  },
);

const keyUnitLevel = 'Activity.levels.unit.level';
const keyUnitLevels = 'Activity.levels.unit.levels';
const keyUnitPoint = 'Activity.levels.unit.point';
const keyUnitPoints = 'Activity.levels.unit.points';

const keyLevelUpMessage = pfx + 'announcement.message';
const msgLevelUpMessage = getMessage(keyLevelUpMessage);

const keyCommandFailed = 'Activity.levels.commands.get-levels.failed';
const msgCommandFailed = getDocumentation(keyCommandFailed);
const varCommandFailed = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsFailed,
);

const keyCommandOther = 'Activity.levels.commands.get-levels.other';
const msgCommandOther = getDocumentation(keyCommandOther);
const varCommandOther = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsOther,
);

const keyCommandOthers = 'Activity.levels.commands.get-levels.others';
const msgCommandOthers = getDocumentation(keyCommandOthers);
const varCommandOthers = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsOthers,
);

const keyCommandOthersAhead =
  'Activity.levels.commands.get-levels.others-ahead';
const msgCommandOthersAhead = getDocumentation(keyCommandOthersAhead);
const varCommandOthersAhead = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsOthersAhead,
);

const keyCommandOthersBehind =
  'Activity.levels.commands.get-levels.others-behind';
const msgCommandOthersBehind = getDocumentation(keyCommandOthersBehind);
const varCommandOthersBehind = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsOthersBehind,
);

const keyCommandYourself = 'Activity.levels.commands.get-levels.yourself';
const msgCommandYourself = getDocumentation(keyCommandYourself);
const varCommandYourself = getVariables(
  ContentConfigs.ModuleConfigActivityLevelsCommandsGetLevelsYourself,
);

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const [settings, setSettings] = useState<CardSettings | null>(null);
  const title = usePage(pagesPrefix + 'module.levels.title');
  const [fetch, { data }] = useLazyQuery(levelsQuery);

  useEffect(() => {
    if (!authorized || !guildId) return;
    if (!data) {
      void fetch({ variables: { guildId } });
      return;
    }
    if (data.guild.guildId !== guildId) {
      void fetch({ variables: { guildId } });
      return;
    }

    const settingLevel = new CreateSettingCard()
      .id('module')
      .title(msgLevel.title)
      .description(msgLevel.description)
      .enabled(
        data?.guild?.moduleLevel?.enabled ?? false,
        changeKeys.modulesLevels.key,
      )
      .addFlexSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.modulesLevelsWordLevel.key)
            .title(getMessage(pfx + 'word.level'))
            .value(
              findTranslation(data?.guild?.translations ?? [], keyUnitLevel),
            )
            .defaultKey(keyUnitLevel),
        ),
      )
      .addFlexSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.modulesLevelsWordLevels.key)
            .title(getMessage(pfx + 'word.levels'))
            .value(
              findTranslation(data?.guild?.translations ?? [], keyUnitLevels),
            )
            .defaultKey(keyUnitLevels),
        ),
      )
      .addFlexSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.modulesLevelsWordPoint.key)
            .title(getMessage(pfx + 'word.point'))
            .value(
              findTranslation(data?.guild?.translations ?? [], keyUnitPoint),
            )
            .defaultKey(keyUnitPoint),
        ),
      )
      .addFlexSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.modulesLevelsWordPoints.key)
            .title(getMessage(pfx + 'word.points'))
            .value(
              findTranslation(data?.guild?.translations ?? [], keyUnitPoints),
            )
            .defaultKey(keyUnitPoints),
        ),
      )
      .build();

    const settingLevelUp = new CreateSettingCard()
      .id('levels')
      .title(msgLevelUp.title)
      .description(msgLevelUp.description)
      .enabled(
        data?.guild?.moduleLevel?.announcementChannelId ?? false,
        changeKeys.moduleLevelsAnnouncement.key,
      )
      .addSubItem((subItem) =>
        subItem.select((select) =>
          select //
            .key(changeKeys.moduleLevelsAnnouncementChannel.key)
            .title(changeKeys.moduleLevelsAnnouncementChannel.title) // Todo: Translate
            .value(data?.guild?.moduleLevel?.announcementChannelId ?? null)
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
            .key(changeKeys.moduleLevelsLevelUpText.key)
            .title(msgLevelUpMessage)
            .value(findTranslation(data?.guild?.translations, keyLevelUp))
            .defaultKey(keyLevelUp)
            .variables(varLevelUp),
        ),
      )
      .addFlexSubItem((subItem) =>
        subItem
          .select((select) =>
            select //
              .key(changeKeys.moduleLevelsNicknameNumbersLevels.key)
              .title(changeKeys.moduleLevelsNicknameNumbersLevels.title) // Todo: Translate
              .value(
                (findTranslation(
                  data?.guild?.translations,
                  keyNicknameLevels,
                ) ||
                  msgNicknameLevels) ??
                  null,
              )
              .options(numberOptions),
          )
          .select((select) =>
            select //
              .key(changeKeys.moduleLevelsNicknameNumbersRecentLevels.key)
              .title(changeKeys.moduleLevelsNicknameNumbersRecentLevels.title) // Todo: Translate
              .value(
                (findTranslation(
                  data?.guild?.translations,
                  keyNicknameRecentLevels,
                ) ||
                  msgNicknameRecentLevels) ??
                  null,
              )
              .options(numberOptions),
          )
          .select((select) =>
            select //
              .key(changeKeys.moduleLevelsNicknameNumbersPoints.key)
              .title(changeKeys.moduleLevelsNicknameNumbersPoints.title) // Todo: Translate
              .value(
                (findTranslation(
                  data?.guild?.translations,
                  keyNicknamePoints,
                ) ||
                  msgNicknamePoints) ??
                  null,
              )
              .options(numberOptions),
          )
          .select((select) =>
            select //
              .key(changeKeys.moduleLevelsNicknameNumbersRecentPoints.key)
              .title(changeKeys.moduleLevelsNicknameNumbersRecentPoints.title) // Todo: Translate
              .value(
                (findTranslation(
                  data?.guild?.translations,
                  keyNicknameRecentPoints,
                ) ||
                  msgNicknameRecentPoints) ??
                  null,
              )
              .options(numberOptions),
          ),
      )
      .build();

    const settingNickname = new CreateSettingCard()
      .id('0')
      .title(msgNickname.title)
      .description(msgNickname.description)
      .enabled(
        data?.guild?.moduleLevel?.nicknames ?? false,
        changeKeys.moduleLevelsNickname.key,
      )
      .addSubItem((subItem) =>
        subItem.input((input) =>
          input //
            .key(changeKeys.moduleLevelsNicknameText.key)
            .value(findTranslation(data?.guild?.translations, keyNickname))
            .defaultKey(keyNickname)
            .variables(varNickname),
        ),
      )
      .build();

    const settingCommand = new CreateSettingCard()
      .id('0')
      .title(msgCommand.title)
      .description(msgCommand.description)
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandYourself.key)
            .title(msgCommandYourself.title)
            .description(msgCommandYourself.description)
            .value(
              findTranslation(data?.guild?.translations, keyCommandYourself),
            )
            .defaultKey(keyCommandYourself)
            .variables(varCommandYourself),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandOther.key)
            .title(msgCommandOthers.title)
            .description(msgCommandOthers.description)
            .value(findTranslation(data?.guild?.translations, keyCommandOther))
            .defaultKey(keyCommandOther)
            .variables(varCommandOther),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandOthers.key)
            .title(msgCommandOthers.title)
            .description(msgCommandOthers.description)
            .value(findTranslation(data?.guild?.translations, keyCommandOthers))
            .defaultKey(keyCommandOthers)
            .variables(varCommandOthers),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandOthersAhead.key)
            .title(msgCommandOthersAhead.title)
            .description(msgCommandOthersAhead.description)
            .value(
              findTranslation(data?.guild?.translations, keyCommandOthersAhead),
            )
            .defaultKey(keyCommandOthersAhead)
            .variables(varCommandOthersAhead),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandOthersBehind.key)
            .title(msgCommandOthersBehind.title)
            .description(msgCommandOthersBehind.description)
            .value(
              findTranslation(
                data?.guild?.translations,
                keyCommandOthersBehind,
              ),
            )
            .defaultKey(keyCommandOthersBehind)
            .variables(varCommandOthersBehind),
        ),
      )
      .addSubItem((subItem) =>
        subItem.textarea((input) =>
          input //
            .key(changeKeys.moduleLevelsCommandFailed.key)
            .title(msgCommandFailed.title)
            .description(msgCommandFailed.description)
            .value(findTranslation(data?.guild?.translations, keyCommandFailed))
            .defaultKey(keyCommandFailed)
            .variables(varCommandFailed),
        ),
      )
      .build();

    setSettings([
      settingLevel,
      settingLevelUp,
      settingNickname,
      settingCommand,
    ]);
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
