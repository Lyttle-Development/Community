import { Guild, GuildAuditLogsEntry } from 'discord.js';

export interface GuildAuditLogsEntryWithGuildId extends GuildAuditLogsEntry {
  guildId: string;
}

const maxAuditLogs = 100;
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
  while (mostRecentAuditLogs.length > maxAuditLogs) {
    mostRecentAuditLogs.shift();
  }
}
