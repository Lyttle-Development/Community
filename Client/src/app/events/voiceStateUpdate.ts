import {VoiceState} from 'discord.js';
import {GuildMember} from '../../types/app/GuildMember';

// Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
async function voiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
): Promise<void> {
  const serverUser: GuildMember = {
    guildId: newState.guild.id ?? oldState.guild.id,
    userId: newState.member.id ?? oldState.member.id,
  };
}

export default voiceStateUpdate;
