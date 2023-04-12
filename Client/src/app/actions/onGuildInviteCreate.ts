import { executor } from '../../utils';
import { actionPrefix } from './index';
import { Invite } from 'discord.js';
import { GuildMember, LevelEvent } from '../../types';
import { createEvent } from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildInviteCreate.';

// The execute function
export async function onGuildInviteCreate(
  guildMember: GuildMember,
  invite: Invite,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.invite,
      guildMember,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
