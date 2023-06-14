import { actionPrefix } from './index';
import { ButtonInteraction } from 'discord.js';
import { GuildMember } from '../../types';
import { executor, limit } from '../../utils';
import { routeButtonPress, triggerActivityStat } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInteractionButton.';

// The execute function
export async function onGuildInteractionButton(
  guildMember: GuildMember,
  interaction: ButtonInteraction,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
    executor(
      prefix + 'routeButtonPress',
      routeButtonPress,
      guildMember,
      interaction,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
