import { executor } from '../../utils';
import { actionPrefix } from './index';
import { VoiceState } from 'discord.js';
import { GuildMember, LevelEvent, VoiceEvent } from '../../types';
import {
  createEvent,
  triggerCallEvent,
  triggerDynamicVoice,
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
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
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
      prefix + 'levelCallEvent',
      triggerDynamicVoice,
      guildMember,
      oldState,
      newState,
      voiceEvent,
    ),
  ];

  // Execute all actions
  await Promise.all(actions);
}
