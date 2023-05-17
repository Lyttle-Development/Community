import { getAuditLogs } from '../get-audit-logs';
import { GuildMember } from '../../../../types';

export function userUpdatedTheirName(guildMember: GuildMember) {
  // Get guild id and user id
  const { guildId, userId } = guildMember;

  // Get the audit logs
  const results = getAuditLogs(guildId, userId, 'User', 'Update');

  // Find the nickname one.
  const result = results.find((x) => x?.changes[0]?.key === 'nick');

  // If no result, return true. (no nickname was changed)
  if (!result) return true;

  // Check state.
  return result?.executorId === userId;
}
