import { executor } from '../../utils';
import { actionPrefix } from './index';
import { Guild, GuildAuditLogsEntry } from 'discord.js';
import { getStaff, triggerAuditLog } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildMemberUpdate.';

// The execute function
export async function onGuildAuditLogEntryCreate(
  auditLog: GuildAuditLogsEntry,
  guild: Guild,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'triggerAuditLog', triggerAuditLog, auditLog, guild),
    executor(prefix + 'getStaff', getStaff, guild),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
