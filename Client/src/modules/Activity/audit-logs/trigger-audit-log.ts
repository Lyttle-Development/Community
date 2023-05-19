import { Guild, GuildAuditLogsEntry } from 'discord.js';
import { MAX_AUDIT_LOGS } from '../../../../constants';

export interface GuildAuditLogsEntryWithGuildId extends GuildAuditLogsEntry {
  guildId: string;
}

export const mostRecentAuditLogs: GuildAuditLogsEntryWithGuildId[] = [];

export function triggerAuditLog(auditLog: GuildAuditLogsEntry, guild: Guild) {
  const auditLogWithGuildId: GuildAuditLogsEntryWithGuildId = {
    ...auditLog,
    guildId: guild.id,
    createdAt: auditLog.createdAt,
    createdTimestamp: auditLog.createdTimestamp,
    toJSON: auditLog.toJSON,
  };

  // Add the audit log to the array
  mostRecentAuditLogs.push(auditLogWithGuildId);

  // If we have more than the max, remove the oldest
  while (mostRecentAuditLogs.length > MAX_AUDIT_LOGS) {
    mostRecentAuditLogs.shift();
  }
}
