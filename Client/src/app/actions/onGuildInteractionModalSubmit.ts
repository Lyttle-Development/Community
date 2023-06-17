import { actionPrefix } from './index';
import { ModalSubmitInteraction } from 'discord.js';
import { GuildMember } from '../../types';
import { executor, limit } from '../../utils';
import { routeModalSubmit, triggerActivityStat } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInteractionModalSubmit.';

// The execute function
export async function onGuildInteractionModalSubmit(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
    executor(
      prefix + 'routeModalSubmit',
      routeModalSubmit,
      guildMember,
      interaction,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
