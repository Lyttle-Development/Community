import { SEND_STATS_INTERVAL, STATS_CHANNEL_ID } from '../../../../constants';
import { sendMessage } from '../../messages';
import { formatNumber, getDayString } from '../../helpers';
import { getStats, Stats } from '../../helpers/get-stats';

let statsQueueStarted = false;

export function startupStatsQueue() {
  if (statsQueueStarted) return;
  statsQueueStarted = true;

  setInterval(sendStatsToQueue, SEND_STATS_INTERVAL);
  sendStatsToQueue();
}

function sendStatsToQueue() {
  const stats: Stats = getStats();

  // The message:
  const message =
    //
    `**Bot Stats** @ <t:${stats.now}:F>:

**General**:
> - **Booted**: <t:${stats.boot}:R>
> - **Online**: \`${stats.onlineTime} hours\`
> - **Guilds**: \`${stats.totalGuilds}\`
> - **Today**: \`${stats.todayInt} (${getDayString(stats.todayInt)})\`

**Queue**:
> - **Total item queued**: \`${stats.totalQueues}\`
> - **Items in queue**: \`${stats.itemsInQueue}\`
> - **Jobs in use**: \`${stats.jobsInUse}/${stats.ALLOWED_REQUESTS_SECOND}\`

**Executor**:
> - **Known modules**: \`${formatNumber(stats.totalExecutorModules)}\`
> - **Disabled modules**: \`${formatNumber(stats.disabledExecutorModules)}\`

**Rate Limit**:
> - **Total checks**: \`${formatNumber(stats.rateLimitTotalChecks)}\`
> - **Being checked**: \`${formatNumber(stats.totalRateLimitChecks)}\`
> - **Currently blocked**: \`${formatNumber(stats.totalRateLimitBlocked)}\`

**Interactions**:
> - **Registered Commands**: \`${formatNumber(
      stats.totalRegisteredCommandInteractions,
    )}\`
> - **Registered User Context Menu Commands**: \`${formatNumber(
      stats.totalRegisteredUserContextMenuCommandInteractions,
    )}\`
> - **Registered Buttons**: \`${formatNumber(
      stats.totalRegisteredButtonInteractions,
    )}\`
> - **Registered Modals**: \`${formatNumber(
      stats.totalRegisteredModalInteractions,
    )}\`

**Actions**:
> - **Processing**: \`${formatNumber(stats.totalActionsBeingProcessed)}\`
> - **Queued**: \`${formatNumber(stats.totalActionsQueued)}\`

**Stats**: (Since last reboot)
> - **Total times points given**: \`${formatNumber(
      stats.timesPointsGivenSinceLastRestart,
    )}\`
> - **Total amount of points given**: \`${formatNumber(
      stats.totalPointsGivenSinceLastRestart,
    )}\`
> - **Total events created (passed & denied)**: \`${formatNumber(
      stats.timesEventsCreatedSinceLastRestart,
    )}\`
> - **Total events triggered (passed)**: \`${formatNumber(
      stats.timesEventsTriggeredSinceLastRestart,
    )}\`
> - **"/xp" commands ran**: \`${formatNumber(
      stats.xpCommandsRanAfterLastRestart,
    )}\`
> - **Points reveived from user context menu**: \`${formatNumber(
      stats.xpFromContextMenuRanAfterLastRestart,
    )}\`
> - **"/setbday" commands ran**: \`${formatNumber(
      stats.birthdayCommandsRanAfterLastRestart,
    )}\`
> - **Birthdays set**: \`${formatNumber(stats.birthdaysSetSinceLastRestart)}\`
> - **Nicknames set**: \`${formatNumber(
      stats.totalNicknamesSetSinceLastRestart,
    )}\`
> - **Total Dynamic Channels checked**: \`${formatNumber(
      stats.totalDynamicVoiceChannelCheckedSinceLastRestart,
    )}\`
> - **Total Dynamic Channels created**: \`${formatNumber(
      stats.totalDynamicVoiceChannelCreatedSinceLastRestart,
    )}\`
> - **Total Dynamic Channels deleted**: \`${formatNumber(
      stats.totalDynamicVoiceChannelDeletedSinceLastRestart,
    )}\`
> - **Total Voice Topics Started**: \`${formatNumber(
      stats.totalVoiceTopicsStartedSinceLastRestart,
    )}\`
> - **Total Voice Topics Competed**: \`${formatNumber(
      stats.totalVoiceTopicsCompletedSinceLastRestart,
    )}\`
> - **Total Voice Topics Created**: \`${formatNumber(
      stats.totalVoiceTopicsCreatedSinceLastRestart,
    )}\`
> - **Total Voice Topics Deleted**: \`${formatNumber(
      stats.totalVoiceTopicsDeletedSinceLastRestart,
    )}\`

**Caches**:
> - **Message-channels in cache**: \`${formatNumber(
      stats.totalMessageChannelsInQueue,
    )}\`
> - **Dynamic Channels Being Checked**: \`${formatNumber(
      stats.totalDynamicChannelsBeingChecked,
    )}\`
> - **Voice Topic Being Created**: \`${formatNumber(
      stats.totalVoiceTopicChildCreations,
    )}\`
> - **Total audit logs being kept**: \`${formatNumber(stats.totalAuditLogs)}\`
> - **Nicknames being set**: \`${formatNumber(stats.totalNicknamesBeingSet)}\`
> - **Birthdays being set**: \`${formatNumber(stats.totalBirthDaysBeingSet)}\`
> - **Staffmembers being checked/saved to stats**: \`${formatNumber(
      stats.totalStaffGuildsCached,
    )}\`

\`\`\` \`\`\`** **`;

  // Send the message:
  void sendMessage(STATS_CHANNEL_ID, message);
}
