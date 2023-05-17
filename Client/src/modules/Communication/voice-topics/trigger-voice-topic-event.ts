import { GuildMember } from '../../../types';
import { VoiceState } from 'discord.js';

export function triggerVoiceTopicEvent(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
) {
  console.log('hello!');
}
