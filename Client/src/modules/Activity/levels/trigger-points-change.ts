import { getLevelsFromPoints } from './utils';
import { GuildMember } from '../../../types';
import { MemberModuleLevel } from '@prisma/client';
import { getOrCreateGuildModuleLevel } from '../../../database/handlers';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { sendMessage } from '../../../utils';
import { ModuleConfigActivityLevelsEventLevelUp } from '../../../../../Content';

/**
 * Triggers the points change event.
 * @param guildMember
 * @param db_MemberModuleLevel_old
 * @param db_MemberModuleLevel
 */
export async function triggerPointsChange(
  guildMember: GuildMember,
  db_MemberModuleLevel_old: MemberModuleLevel,
  db_MemberModuleLevel: MemberModuleLevel,
) {
  // Destructure activityEvent
  const { guildId } = guildMember;

  // Get old level
  const oldLevel = await getLevelsFromPoints(
    guildId,
    db_MemberModuleLevel_old.points,
  );
  // Get new level
  const level = await getLevelsFromPoints(guildId, db_MemberModuleLevel.points);

  // Check if the level has changed
  if (oldLevel === level) return;

  // If it has, get the announcement channel id
  const { announcement_channel_id: announcementChannelId } =
    await getOrCreateGuildModuleLevel(guildId);

  // if we have an announcement channel id, send the message
  if (announcementChannelId) {
    // Get the message default variables
    const defaultVariables = await getMessageVariables(guildMember);

    // get the unit (key)
    const unitKey = level > 1 ? 'levels' : 'level';

    // Fetch the unit.
    const unit = await getMessage(
      guildId,
      `Activity.levels.unit.${unitKey}`,
      defaultVariables,
      false,
    );

    // Build the message variables
    const messageVars: ModuleConfigActivityLevelsEventLevelUp.Variables = {
      ...defaultVariables,
      lastLevel: oldLevel.toString(),
      level: level.toString(),
      points: db_MemberModuleLevel.points.toString(),
      unit,
    };

    // Get the message with the variables
    const message =
      await getMessage<ModuleConfigActivityLevelsEventLevelUp.Variables>(
        guildId,
        'Activity.levels.event.level-up',
        messageVars,
      );

    // Send the message
    await sendMessage(announcementChannelId.toString(), message, false);
  }
}
