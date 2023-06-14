import { actionPrefix } from './index';
import { Client } from 'discord.js';
import { deployCommands } from '../../utils/deploy-commands';
import { executor } from '../../utils';
import { startupStatsQueue } from '../../utils/queue/stats-queue';
import { triggerDailyStats } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onClientReady.';

// The execute function
export async function onClientReady(client: Client): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'deployCommands', deployCommands),
    executor(prefix + 'startupStatsQueue', startupStatsQueue),
    executor(prefix + 'triggerDailyStats', triggerDailyStats),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
