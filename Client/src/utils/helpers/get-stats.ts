import { getDiscordTime } from './get-discord-time';
import { bootdate, client } from '../../main';
import {
  actionsCurrentlyBeingExecuted,
  actionsInQueue,
  messageQueueChannels,
  queue,
  queueBacklog,
  QueueBacklogType,
  queueFree,
  totalQueues,
} from '../queue';
import { executorModules } from '../executer';
import {
  cacheGuilds,
  channelsBeingChecked,
  mostRecentAuditLogs,
  nicknamesBeingSet,
  registeredButtonInteractions,
  registeredCommandInteractions,
  registeredContextMenuCommandInteractions,
  registeredModalInteractions,
  timesEventsCreatedSinceLastRestart,
  timesEventsTriggeredSinceLastRestart,
  timesPointsGivenSinceLastRestart,
  totalDynamicVoiceChannelCheckedSinceLastRestart,
  totalDynamicVoiceChannelCreatedSinceLastRestart,
  totalDynamicVoiceChannelDeletedSinceLastRestart,
  totalNicknamesSetSinceLastRestart,
  totalPointsGivenSinceLastRestart,
  totalVoiceTopicsCompletedSinceLastRestart,
  totalVoiceTopicsCreatedSinceLastRestart,
  totalVoiceTopicsDeletedSinceLastRestart,
  totalVoiceTopicsStartedSinceLastRestart,
  voiceTopicChildCreationCache,
  xpCommandsRanAfterLastRestart,
  xpFromContextMenuRanAfterLastRestart,
} from '../../modules';
import {
  rateLimitCache,
  rateLimitLimited,
  rateLimitTotalChecks,
} from '../rate-limit';
import { setBirthDayCache } from '../../modules/Activity/birth-day/set-birth-day-modal';
import { getObjectValuesLength } from './get-object-values-length';
import { getObjectKeysLength } from './get-object-keys-length';
import { birthdayCommandsRanAfterLastRestart } from '../../modules/Activity/birth-day';
import { birthdaysSetSinceLastRestart } from '../../modules/Activity/birth-day/set-birth-day-buttons';
import { saveStats } from './save-stats';
import { ALLOWED_REQUESTS_SECOND } from '../../../constants';

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

export function getStats() {
  const gKL = getObjectKeysLength;
  const gVL = getObjectValuesLength;
  const stats: Stats = {
    // Global:
    now: getDiscordTime(new Date()),

    // General:
    boot: getDiscordTime(bootdate),
    totalGuilds: client.guilds.cache.size,

    // Queue:
    jobsInUse: queueFree.filter((job) => !job).length,
    itemsInQueue:
      queueBacklog[QueueBacklogType.CRITICAL].length +
      queueBacklog[QueueBacklogType.URGENT].length +
      queueBacklog[QueueBacklogType.IMPORTANT].length +
      queueBacklog.time.length +
      queueBacklog.timeout.length +
      queueBacklog[QueueBacklogType.NORMAL].length +
      queueBacklog[QueueBacklogType.LOW].length +
      queueBacklog[QueueBacklogType.BACKGROUND].length,

    // Caches:
    totalExecutorModules: gKL(executorModules),
    disabledExecutorModules: Object.values(executorModules).filter(
      (x) => !x.enabled,
    ).length,
    totalRegisteredCommandInteractions: gVL(registeredCommandInteractions),
    totalRegisteredUserContextMenuCommandInteractions: gVL(
      registeredContextMenuCommandInteractions,
    ),
    totalRegisteredButtonInteractions: gVL(registeredButtonInteractions),
    totalRegisteredModalInteractions: gVL(registeredModalInteractions),
    totalActionsQueued: actionsInQueue.length,
    totalActionsBeingProcessed: actionsCurrentlyBeingExecuted.length,
    totalMessageChannelsInQueue: gKL(messageQueueChannels),
    totalRateLimitChecks: gKL(rateLimitCache),
    totalRateLimitBlocked: gKL(rateLimitLimited),
    totalDynamicChannelsBeingChecked: gKL(channelsBeingChecked),
    totalVoiceTopicChildCreations: gKL(voiceTopicChildCreationCache),
    totalNicknamesBeingSet: gKL(nicknamesBeingSet),
    totalAuditLogs: mostRecentAuditLogs.length,
    totalBirthDaysBeingSet: gKL(setBirthDayCache),
    totalStaffGuildsCached: cacheGuilds.length,

    // get online time in hours
    onlineTime:
      Math.floor(((Date.now() - bootdate.getTime()) / 1000 / 60 / 60) * 100) /
      100,
    todayInt: new Date().getDay(),

    // Activity:
    totalQueues,
    ALLOWED_REQUESTS_SECOND,
    rateLimitTotalChecks,
    timesPointsGivenSinceLastRestart,
    totalPointsGivenSinceLastRestart,
    timesEventsCreatedSinceLastRestart,
    timesEventsTriggeredSinceLastRestart,
    xpCommandsRanAfterLastRestart,
    xpFromContextMenuRanAfterLastRestart,
    birthdayCommandsRanAfterLastRestart,
    birthdaysSetSinceLastRestart,
    totalNicknamesSetSinceLastRestart,
    totalDynamicVoiceChannelCheckedSinceLastRestart,
    totalDynamicVoiceChannelCreatedSinceLastRestart,
    totalDynamicVoiceChannelDeletedSinceLastRestart,
    totalVoiceTopicsStartedSinceLastRestart,
    totalVoiceTopicsCompletedSinceLastRestart,
    totalVoiceTopicsCreatedSinceLastRestart,
    totalVoiceTopicsDeletedSinceLastRestart,
  };

  // Sort stats by key-name alphabetically
  const statsSorted: Stats = Object.keys(stats)
    .sort()
    .reduce((acc, key) => {
      acc[key] = stats[key];
      return acc;
    }, {} as Stats);

  queue(QueueBacklogType.BACKGROUND, () => saveStats(statsSorted));

  return statsSorted;
}
