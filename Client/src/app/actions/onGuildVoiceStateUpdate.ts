import { executor, limit } from '../../utils';
import { actionPrefix } from './index';
import { VoiceState } from 'discord.js';
import { GuildMember, LevelEvent, VoiceEvent } from '../../types';
import {
  checkDynamicChannels,
  checkVoiceTopicChannels,
  createEvent,
  triggerActivityStat,
  triggerCallEvent,
} from '../../modules';

// This file's prefix
const prefix: string = actionPrefix + 'onGuildVoiceStateUpdate.';

// The execute function
export async function onGuildVoiceStateUpdate(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
  voiceEvent: VoiceEvent,
): Promise<void> {
  if (await limit(guildMember)) return;

  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'activity', triggerActivityStat, guildMember),
    executor(
      prefix + 'levelEvent',
      createEvent,
      LevelEvent.voiceUpdate,
      guildMember,
    ),
    executor(
      prefix + 'levelCallEvent',
      triggerCallEvent,
      guildMember,
      oldState,
      newState,
      voiceEvent,
    ),
    executor(
      prefix + 'dynamicVoiceEvent',
      checkDynamicChannels,
      guildMember,
      oldState,
      newState,
    ),
    executor(
      prefix + 'voiceTopicEvent',
      checkVoiceTopicChannels,
      guildMember,
      oldState,
      newState,
    ),
  ];

  // If no actions, return
  if (actions.length < 1) return;

  // Execute all actions
  await Promise.all(actions);
}
