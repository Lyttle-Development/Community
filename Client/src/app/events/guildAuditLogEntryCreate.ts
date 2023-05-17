import { Guild, GuildAuditLogsEntry } from 'discord.js';
import { onGuildAuditLogEntryCreate } from '../actions';

// Emitted whenever a guild audit log entry is created.
async function guildAuditLogEntryCreate(
  auditLog: GuildAuditLogsEntry,
  guild: Guild,
): Promise<void> {
  await onGuildAuditLogEntryCreate(auditLog, guild);
}

export default guildAuditLogEntryCreate;
