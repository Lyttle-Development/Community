import { getLevelsFromPoints } from './utils/get-levels-from-points';
import { GuildMember } from '../../../types';
import { MemberModuleLevel } from '@prisma/client';
import { getOrCreateGuildModuleLevel } from '../../../database/handlers';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { sendMessage } from '../../../utils';
import { ModuleConfigActivityLevelsEventLevelUp } from '../../../../../Content';

export async function triggerPointsChange(
  guildMember: GuildMember,
  oldLevels: MemberModuleLevel,
  newLevels: MemberModuleLevel,
) {
  // Destructure activityEvent
  const { guildId } = guildMember;

  const oldLevel = await getLevelsFromPoints(guildId, oldLevels.points);
  const newLevel = await getLevelsFromPoints(guildId, newLevels.points);
  if (oldLevel !== newLevel) {
    const { announcement_channel_id: announcementChannelId } =
      await getOrCreateGuildModuleLevel(guildId);
    if (announcementChannelId) {
      const defaultVariables = await getMessageVariables(guildMember);
      const unitKey = newLevel > 1 ? 'levels' : 'level';
      const unit = await getMessage(
        guildId,
        `Activity.levels.unit.${unitKey}`,
        defaultVariables,
        false,
      );
      const messageVars: ModuleConfigActivityLevelsEventLevelUp.Variables = {
        ...defaultVariables,
        lastLevel: oldLevel.toString(),
        level: newLevel.toString(),
        exp: newLevels.points.toString(),
        unit,
      };
      const message =
        await getMessage<ModuleConfigActivityLevelsEventLevelUp.Variables>(
          guildId,
          'Activity.levels.event.level-up',
          messageVars,
        );
      await sendMessage(announcementChannelId.toString(), message, false);
    }
  }
}
