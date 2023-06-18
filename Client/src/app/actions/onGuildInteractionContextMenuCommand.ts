import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { ContextMenuCommandInteraction } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import {
  createEvent,
  routeContextMenuCommand,
  triggerActivityStat,
} from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInteractionContextMenuCommand.';

// The execute function
export async function onGuildInteractionContextMenuCommand(
  guildMember: GuildMember,
  interaction: ContextMenuCommandInteraction,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
    executor(
      prefix + 'routeContextMenuCommand',
      routeContextMenuCommand,
      guildMember,
      interaction,
    ),
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.command,
      guildMember,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
