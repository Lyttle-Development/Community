import { getLevelsFromPoints } from './utils/get-levels-from-points';
import { GuildMember } from '../../../types';
import { MemberModuleLevel } from '@prisma/client';
import { getOrCreateGuildModuleLevel } from '../../../database/handlers';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import { sendMessage } from '../../../utils';
import { ModuleConfigActivityLevelsEventLevelUp } from '../../../../../Content';

export async function triggerPointsChange(
  guildMember: GuildMember,
  db_MemberModuleLevel_old: MemberModuleLevel,
  db_MemberModuleLevel: MemberModuleLevel,
) {
  // Destructure activityEvent
  const { guildId } = guildMember;

  const oldLevel = await getLevelsFromPoints(
    guildId,
    db_MemberModuleLevel_old.points,
  );
  const level = await getLevelsFromPoints(guildId, db_MemberModuleLevel.points);
  if (oldLevel !== level) {
    const { announcement_channel_id: announcementChannelId } =
      await getOrCreateGuildModuleLevel(guildId);
    if (announcementChannelId) {
      const defaultVariables = await getMessageVariables(guildMember);
      const unitKey = level > 1 ? 'levels' : 'level';
      const unit = await getMessage(
        guildId,
        `Activity.levels.unit.${unitKey}`,
        defaultVariables,
        false,
      );
      const messageVars: ModuleConfigActivityLevelsEventLevelUp.Variables = {
        ...defaultVariables,
        lastLevel: oldLevel.toString(),
        level: level.toString(),
        exp: db_MemberModuleLevel.points.toString(),
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
