import { VoiceState } from 'discord.js';

import { GuildMember, VoiceEvent } from '../../../types';
import {
  getOrCreateGuildModuleLevel,
  getOrCreateMemberModuleLevel,
  setMemberModuleLevelValue,
} from '../../../database/handlers';
import { EVENT_PRICES } from './constants';
import { givePoints } from './give-points';

const CallTimeLimit = 24 * 60 * 60 * 1000;

export async function triggerCallEvent(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
  voiceEvent: VoiceEvent,
): Promise<void> {
  // Destructure guildMember
  const { guildId } = guildMember;

  // Get guild module level settings.
  const db_GuildModuleLevel = await getOrCreateGuildModuleLevel(guildId);

  // If the levels module is not enabled, stop here.
  if (!db_GuildModuleLevel.enabled) return;

  // Check if the user is in a group, alone?
  const groupCheckPassed = await groupCheck(guildMember, oldState, newState);
  if (!groupCheckPassed) return;

  // Check if the user was or is muted.
  const memberCheckPassed = await memberCheck(oldState, newState);
  if (!memberCheckPassed) return;

  // Check if the user joined, left or switched.
  switch (voiceEvent) {
    case VoiceEvent.JOIN:
      // Reset the points for the join.
      await reset(guildMember);
      break;
    case VoiceEvent.LEAVE:
      // Give points for the leave.
      await give(guildMember);
      break;
    case VoiceEvent.SWITCH:
      // Give points for the switch.
      await give(guildMember);
      break;
    default:
      // Reset if all failed.
      await reset(guildMember);
      break;
  }
}

async function groupCheck(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
): Promise<boolean> {
  const { guildId, userId } = guildMember;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  // Get variables for groupCheck.
  const leaves = oldChannel && !newChannel;
  const channel = newChannel ?? oldChannel;
  const members = channel.members.filter((member) => !member.user.bot);
  const memberCount = members.size;

  // Check if the user is not alone.
  if (memberCount > 1 && memberCount <= 2) {
    // reset all members
    for (const [, member] of members) {
      // Don't reset the user who triggered the event.
      if (member.id !== userId) {
        // Reset the other member.
        await reset({ guildId, userId: member.id });
      }
    }
    // Return pass.
    return true;
  }

  // if a leave event happened, check if the user is alone now.
  if (leaves && memberCount < 2) {
    // Reset user if he was alone
    if (memberCount < 1) {
      await reset(guildMember);
      // Return break.
      return false;
    }

    // Give points to the other member.
    for (const [, member] of members) {
      // Don't give points to the user who triggered the event.
      if (member.id !== userId) {
        // Give points to the other member.
        await give(guildMember);
      }
    }
    // Return pass.
    return true;
  }

  // Return break. (if all checks failed)
  return false;
}

const memberCheck = async (
  oldState: VoiceState,
  newState: VoiceState,
): Promise<boolean> => {
  // Get variables for memberCheck.
  const beforeMute = oldState.mute ?? false;
  const afterMute = newState.mute ?? false;

  // If the user was muted, don't give points.
  return (beforeMute && !afterMute) || (!beforeMute && !afterMute);
};

async function reset(guildMember: GuildMember): Promise<void> {
  // Get variables for reset.
  const { guildId, userId } = guildMember;
  // Reset the call_start.
  await setMemberModuleLevelValue(guildId, userId, { call_start: new Date() });
}

async function give(guildMember: GuildMember): Promise<boolean> {
  // Get variables for give.
  const { guildId, userId } = guildMember;

  // Get the memberModuleLevel database record.
  const db_MemberModuleLevel = await getOrCreateMemberModuleLevel(
    guildId,
    userId,
  );

  // If the user has no call_start, reset and return false.
  if (!db_MemberModuleLevel.call_start) {
    // Reset the user.
    await reset(guildMember);

    // Return break.
    return false;
  }

  // Calculate the time between the call_start and now.
  const timeBetween =
    new Date().getTime() - db_MemberModuleLevel.call_start.getTime();
  // Calculate the points reward.
  const rawPointsReward = (timeBetween / 60000) * EVENT_PRICES.inCallTime;
  // Round to 4 decimal places.
  const pointsReward = Math.round(rawPointsReward * 10000) / 10000;

  // If the time between is greater than the call time limit, reset and return false.
  if (timeBetween > CallTimeLimit) {
    // Reset the user.
    await reset(guildMember);
    // Return break.
    return false;
  }

  // Give the points.
  await givePoints(pointsReward, { guildId, userId });
  // Reset the user.
  await reset(guildMember);
  // Return pass.
  return true;
}
