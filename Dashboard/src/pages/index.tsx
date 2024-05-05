import { Layout } from '@lyttledev-dashboard/layouts';
import styles from './index.module.scss';
import { Component } from '@lyttledev-dashboard/components';
import { dashboardPrefix, getMessage } from '@lyttledev-dashboard/utils';
import { ButtonColors } from '@lyttledev-dashboard/components/button';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { Constants } from '@lyttledev-dashboard/constants';
import { gql, useQuery } from '@apollo/client';
import { StatsCardColors } from '@lyttledev-dashboard/components/stats-card';
import { getTotal } from '@lyttledev-dashboard/utils/get-total';
import { getTotalChange } from '@lyttledev-dashboard/utils/get-total-change';

export const pagesPrefix = dashboardPrefix + 'pages.';

const GeneralStatsQuery = gql`
  query GeneralStatsQuery {
    getGeneralStats {
      value
    }
  }
`;

function Page() {
  const pfx = pagesPrefix + 'home.';
  const statsPfx = pfx + 'stats.';
  const title = usePage(pfx + 'title');
  const msgStatsTitle = getMessage(statsPfx + 'title');
  const msgTitle = getMessage(pfx + 'landing-title');
  const msgDescription = getMessage(pfx + 'landing-description');
  const msgAdd = getMessage(pfx + 'add-button');
  const msgJoin = getMessage(pfx + 'join-button');

  const { data } = useQuery(GeneralStatsQuery);

  const stats: Stats = data?.getGeneralStats?.value
    ? JSON.parse(data?.getGeneralStats?.value)
    : null;
  console.log(stats);

  const openInvite = () => {
    window.open('https://discord.gg/QfqFFPFFQZ', '_blank');
  };
  const openAdd = () => {
    window.location.href = Constants.inviteBotUrl;
  };

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <section className={styles.landing}>
          <Component.Logo className={styles.logo} />
          <h2>{msgTitle}</h2>
          <p className={styles.description}>{msgDescription}</p>
          <ul className={styles.buttons}>
            <li>
              <Component.Button text={msgAdd} onClick={openAdd} noUpper />
            </li>
            <li>
              <Component.Button
                text={msgJoin}
                onClick={openInvite}
                noUpper
                color={ButtonColors.secondary}
              />
            </li>
          </ul>
        </section>

        <Component.Container>
          <h2>{msgStatsTitle}</h2>
          <Component.Stats
            stats={[
              {
                title: getMessage(statsPfx + 'total-guilds'),
                value: stats?.totalGuilds || 0,
                change: getTotalChange(100, stats?.totalGuilds || 0),
                changeNote: ' more until verified',
                total: getTotal(100, stats?.totalGuilds || 0),
              },
              {
                title: getMessage(
                  statsPfx + 'total-points-given-since-last-restart',
                ),
                value: stats?.totalPointsGivenSinceLastRestart || 0,
                color: StatsCardColors.Yellow,
                total: getTotal(
                  25000,
                  stats?.totalPointsGivenSinceLastRestart || 0,
                ),
              },
              {
                title: getMessage(
                  statsPfx + 'total-dynamic-channels-being-checked',
                ),
                value: stats?.totalDynamicChannelsBeingChecked || 0,
                color: StatsCardColors.Orange,
                total: getTotal(
                  1500,
                  stats?.totalDynamicChannelsBeingChecked || 0,
                ),
              },
              {
                title: getMessage(statsPfx + 'rate-limit-total-checks'),
                value: stats?.rateLimitTotalChecks || 0,
                color: StatsCardColors.Yellow,
                total: getTotal(1500, stats?.rateLimitTotalChecks || 0),
              },
              {
                title: getMessage(statsPfx + 'total-queues'),
                value: stats?.totalQueues || 0,
                color: StatsCardColors.Orange,
                total: getTotal(2500, stats?.totalQueues || 0),
              },
              {
                title: getMessage(statsPfx + 'jobs-in-use'),
                value: stats?.jobsInUse || 0,
                change: getTotalChange(10, stats?.jobsInUse || 0),
                changeNote: ' unused jobs available',
                total: getTotal(10, stats?.jobsInUse || 0),
              },
            ]}
          ></Component.Stats>
        </Component.Container>
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;

export interface Stats {
  now: number;
  boot: number;
  totalGuilds: number;
  jobsInUse: number;
  itemsInQueue: number;
  totalExecutorModules: number;
  disabledExecutorModules: number;
  totalRegisteredCommandInteractions: number;
  totalRegisteredUserContextMenuCommandInteractions: number;
  totalRegisteredButtonInteractions: number;
  totalRegisteredModalInteractions: number;
  totalActionsQueued: number;
  totalActionsBeingProcessed: number;
  totalMessageChannelsInQueue: number;
  totalRateLimitChecks: number;
  totalRateLimitBlocked: number;
  totalDynamicChannelsBeingChecked: number;
  totalVoiceTopicChildCreations: number;
  totalNicknamesBeingSet: number;
  totalAuditLogs: number;
  totalBirthDaysBeingSet: number;
  totalStaffGuildsCached: number;
  onlineTime: number;
  todayInt: number;

  // Activity:
  totalQueues: number;
  ALLOWED_REQUESTS_SECOND: number;
  rateLimitTotalChecks: number;
  timesPointsGivenSinceLastRestart: number;
  totalPointsGivenSinceLastRestart: number;
  timesEventsCreatedSinceLastRestart: number;
  timesEventsTriggeredSinceLastRestart: number;
  xpCommandsRanAfterLastRestart: number;
  xpFromContextMenuRanAfterLastRestart: number;
  birthdayCommandsRanAfterLastRestart: number;
  birthdaysSetSinceLastRestart: number;
  totalNicknamesSetSinceLastRestart: number;
  totalDynamicVoiceChannelCheckedSinceLastRestart: number;
  totalDynamicVoiceChannelCreatedSinceLastRestart: number;
  totalDynamicVoiceChannelDeletedSinceLastRestart: number;
  totalVoiceTopicsStartedSinceLastRestart: number;
  totalVoiceTopicsCompletedSinceLastRestart: number;
  totalVoiceTopicsCreatedSinceLastRestart: number;
  totalVoiceTopicsDeletedSinceLastRestart: number;
}
