import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { CommandInteraction } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent, routeCommand } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInteractionCommand.';

// The execute function
export async function onGuildInteractionCommand(
  guildMember: GuildMember,
  interaction: CommandInteraction,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'routeCommand', routeCommand, guildMember, interaction),
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
