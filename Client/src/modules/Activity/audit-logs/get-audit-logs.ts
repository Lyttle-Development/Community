import {
  GuildAuditLogsEntryWithGuildId,
  mostRecentAuditLogs,
} from './trigger-audit-log';

// Max 20 seconds between audit logs
const maxTimeBetween = 20 * 1000;

export function getAuditLogs(
  guildId,
  targetId,
  targetType,
  targetAction,
): GuildAuditLogsEntryWithGuildId[] {
  const now = new Date().getTime();
  // Filter the audit logs
  const result = mostRecentAuditLogs.filter(
    (x: GuildAuditLogsEntryWithGuildId) => {
      return (
        x.guildId === guildId &&
        x.targetId === targetId &&
        x.targetType === targetType &&
        x.actionType === targetAction
      );
    },
  );

  // If no result, return
  if (result.length < 1) return [];

  // filter out the way to old ones
  const filtered = result.filter((x: GuildAuditLogsEntryWithGuildId) => {
    const createdAt = new Date(x.createdAt).getTime();
    const diff = now - createdAt;
    return diff < maxTimeBetween;
  });

  // If no result, return
  if (filtered.length < 1) return [];

  // Return the result, but newest first.
  return filtered.reverse();
}
