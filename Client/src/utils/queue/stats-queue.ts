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

let statsQueueStarted = false;

export function startupStatsQueue() {
  if (statsQueueStarted) return;
  statsQueueStarted = true;

  setInterval(sendStatsToQueue, SEND_STATS_INTERVAL);
  sendStatsToQueue();
}

function sendStatsToQueue() {
  // Global:
  const now = getDiscordDate(new Date());

  // General:
  const boot = getDiscordDate(bootdate);
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
> - **Known modules**: \`${f(totalExecutorModules)}\`
> - **Disabled modules**: \`${f(disabledExecutorModules)}\`

**Rate Limit**:
> - **Total checks**: \`${f(rateLimitTotalChecks)}\`
> - **Being checked**: \`${f(totalRateLimitChecks)}\`
> - **Currently blocked**: \`${f(totalRateLimitBlocked)}\`

**Interactions**:
> - **Registered Commands**: \`${f(totalRegisteredCommandInteractions)}\`
> - **Registered Buttons**: \`${f(totalRegisteredButtonInteractions)}\`
> - **Registered Modals**: \`${f(totalRegisteredModalInteractions)}\`

**Actions**:
> - **Processing**: \`${f(totalActionsBeingProcessed)}\`
> - **Queued**: \`${f(totalActionsQueued)}\`

**Caches**:
> - **Message-channels in cache**: \`${f(totalMessageChannelsInQueue)}\`
> - **Dynamic Channels Being Checked**: \`${f(
      totalDynamicChannelsBeingChecked,
    )}\`
> - **Voice Topic Being Created**: \`${f(totalVoiceTopicChildCreations)}\`
> - **Total audit logs being kept**: \`${f(totalAuditLogs)}\`
> - **Nicknames being set**: \`${f(totalNicknamesBeingSet)}\`

\`\`\` \`\`\`** **`;

  // Send the message:
  void sendMessage(STATS_CHANNEL_ID, message);
}

function getDiscordDate(date): number {
  const time = date.getTime();
  return parseInt((time / 1000).toString(), 10);
}

/**
 * Format a number 1000000 to 1,000,000
 * @param nr
 */
function f(nr: string | number) {
  const nrStr = nr.toString();
  const nrArr = nrStr.split('');
  const formatted = [];
  for (let i = nrArr.length - 1; i >= 0; i--) {
    const index = nrArr.length - i - 1;
    if (index % 3 === 0 && index !== 0) {
      formatted.push(',');
    }
    formatted.push(nrArr[i]);
  }
  return formatted.reverse().join('');
}
