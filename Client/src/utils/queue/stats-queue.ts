import {
  ALLOWED_REQUESTS_SECOND,
  SEND_STATS_INTERVAL,
  STATS_CHANNEL_ID,
} from '../../../constants';
import { sendMessage } from './messages';
import { bootdate, client } from '../../main';
import {
  queueBacklog,
  QueueBacklogType,
  queueFree,
  totalQueues,
} from './queue';
import { actionsCurrentlyBeingExecuted, actionsInQueue } from './actions-queue';
import { messageQueueChannels } from './messages-queue';
import {
  rateLimitCache,
  rateLimitLimited,
  rateLimitTotalChecks,
} from '../rate-limit';
import { executorModules } from '../executer';
import {
  channelsBeingChecked,
  mostRecentAuditLogs,
  nicknamesBeingSet,
  registeredButtonInteractions,
  registeredCommandInteractions,
  registeredModalInteractions,
  voiceTopicChildCreationCache,
} from '../../modules';
import { formatNumber, getDiscordTime } from '../helpers';

let statsQueueStarted = false;

export function startupStatsQueue() {
  if (statsQueueStarted) return;
  statsQueueStarted = true;

  setInterval(sendStatsToQueue, SEND_STATS_INTERVAL);
  sendStatsToQueue();
}

function sendStatsToQueue() {
  // Global:
  const now = getDiscordTime(new Date());

  // General:
  const boot = getDiscordTime(bootdate);
  const totalGuilds = client.guilds.cache.size;

  // Queue:
  const jobsInUse = queueFree.filter((job) => !job).length;
  const itemsInQueue =
    queueBacklog[QueueBacklogType.CRITICAL].length +
    queueBacklog[QueueBacklogType.URGENT].length +
    queueBacklog[QueueBacklogType.IMPORTANT].length +
    queueBacklog.time.length +
    queueBacklog.timeout.length +
    queueBacklog[QueueBacklogType.NORMAL].length +
    queueBacklog[QueueBacklogType.LOW].length +
    queueBacklog[QueueBacklogType.BACKGROUND].length;

  // Caches:
  const totalExecutorModules = Object.keys(executorModules).length;
  const disabledExecutorModules = Object.values(executorModules).filter(
    (x) => !x.enabled,
  ).length;
  const totalRegisteredCommandInteractions = Object.values(
    registeredCommandInteractions,
  ).length;
  const totalRegisteredButtonInteractions = Object.values(
    registeredButtonInteractions,
  ).length;
  const totalRegisteredModalInteractions = Object.values(
    registeredModalInteractions,
  ).length;
  const totalActionsQueued = actionsInQueue.length;
  const totalActionsBeingProcessed = actionsCurrentlyBeingExecuted.length;
  const totalMessageChannelsInQueue = Object.keys(messageQueueChannels).length;
  const totalRateLimitChecks = Object.keys(rateLimitCache).length;
  const totalRateLimitBlocked = Object.keys(rateLimitLimited).length;
  const totalDynamicChannelsBeingChecked =
    Object.keys(channelsBeingChecked).length;
  const totalVoiceTopicChildCreations = Object.keys(
    voiceTopicChildCreationCache,
  ).length;
  const totalNicknamesBeingSet = Object.keys(nicknamesBeingSet).length;
  const totalAuditLogs = mostRecentAuditLogs.length;

  // The message:
  const message =
    //
    `**Bot Stats** @ <t:${now}:F>:

**General**:
> - **Booted**: <t:${boot}:R>
> - **Guilds**: \`${totalGuilds}\`

**Queue**:
> - **Total item queued**: \`${totalQueues}\`
> - **Items in queue**: \`${itemsInQueue}\`
> - **Jobs in use**: \`${jobsInUse}/${ALLOWED_REQUESTS_SECOND}\`

**Executor**:
> - **Known modules**: \`${formatNumber(totalExecutorModules)}\`
> - **Disabled modules**: \`${formatNumber(disabledExecutorModules)}\`

**Rate Limit**:
> - **Total checks**: \`${formatNumber(rateLimitTotalChecks)}\`
> - **Being checked**: \`${formatNumber(totalRateLimitChecks)}\`
> - **Currently blocked**: \`${formatNumber(totalRateLimitBlocked)}\`

**Interactions**:
> - **Registered Commands**: \`${formatNumber(
      totalRegisteredCommandInteractions,
    )}\`
> - **Registered Buttons**: \`${formatNumber(
      totalRegisteredButtonInteractions,
    )}\`
> - **Registered Modals**: \`${formatNumber(totalRegisteredModalInteractions)}\`

**Actions**:
> - **Processing**: \`${formatNumber(totalActionsBeingProcessed)}\`
> - **Queued**: \`${formatNumber(totalActionsQueued)}\`

**Caches**:
> - **Message-channels in cache**: \`${formatNumber(
      totalMessageChannelsInQueue,
    )}\`
> - **Dynamic Channels Being Checked**: \`${formatNumber(
      totalDynamicChannelsBeingChecked,
    )}\`
> - **Voice Topic Being Created**: \`${formatNumber(
      totalVoiceTopicChildCreations,
    )}\`
> - **Total audit logs being kept**: \`${formatNumber(totalAuditLogs)}\`
> - **Nicknames being set**: \`${formatNumber(totalNicknamesBeingSet)}\`

\`\`\` \`\`\`** **`;

  // Send the message:
  void sendMessage(STATS_CHANNEL_ID, message);
}
