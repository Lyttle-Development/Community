import { GuildMember, VoiceEvent } from '../../../types';
import { ChannelType, VoiceChannel, VoiceState } from 'discord.js';
import {
  createGuildModuleVoiceGrowthChild,
  delGuildModuleVoiceGrowthChild,
  findSingleGuildModuleVoiceGrowth,
  findSingleGuildModuleVoiceGrowthChild,
} from '../../../database/handlers';
import {
  GuildModuleVoiceGrowth,
  GuildModuleVoiceGrowthChild,
} from '@prisma/client';
import client from '../../../main';
import { queue, QueueBacklogType } from '../../../utils';

export async function triggerDynamicVoice(
  guildMember: GuildMember,
  oldState: VoiceState,
  newState: VoiceState,
  voiceEvent: VoiceEvent,
) {
  const { guildId } = guildMember;
  let channelId = newState.channelId || oldState.channelId;
  console.log(channelId, newState.channelId, oldState.channelId);

  const db_GuildModuleVoiceGrowthChild =
    await findSingleGuildModuleVoiceGrowthChild(guildId, channelId);

  if (
    db_GuildModuleVoiceGrowthChild &&
    db_GuildModuleVoiceGrowthChild.master_id
  ) {
    channelId = db_GuildModuleVoiceGrowthChild.master_id.toString();
  }

  // Check if module enabled
  const db_GuildModuleVoiceGrowth = await findSingleGuildModuleVoiceGrowth(
    guildId,
    channelId,
  );

  // If not enabled, return
  if (!db_GuildModuleVoiceGrowth?.enabled) return;
  if (db_GuildModuleVoiceGrowth.manual) return;

  console.log(db_GuildModuleVoiceGrowth.childs);
  console.log('pass');
  await checkChannels(
    guildId,
    db_GuildModuleVoiceGrowth,
    db_GuildModuleVoiceGrowth.childs,
  );
}

async function checkChannels(
  guildId: string,
  master: GuildModuleVoiceGrowth,
  childs: GuildModuleVoiceGrowthChild[],
) {
  const channelIds = [
    master.channel_id.toString(),
    ...childs.map((x) => x.channel_id.toString()),
  ];

  const channels = channelIds.map((x) => client.channels.cache.get(x));
  const voiceChannels = channels
    .filter((x) => x.type === ChannelType.GuildVoice)
    .map((x) => x as VoiceChannel);

  const emptyChannels = voiceChannels.filter((x) => x.members.size < 1);

  if (emptyChannels.length > 1) {
    console.log('deleting...');
    const channelsToDelete = emptyChannels.slice(emptyChannels.length - 1);
    channelsToDelete.forEach((x) => {
      if (x.manageable) {
        queue(QueueBacklogType.LOW, async () => {
          await x.delete();
          await delGuildModuleVoiceGrowthChild(guildId, x.id);
        });
      }
    });

    return;
  }

  if (emptyChannels.length < 1) {
    console.log('cloning...');
    queue(QueueBacklogType.LOW, async () => {
      const channel = await voiceChannels[voiceChannels.length - 1].clone();
      await createGuildModuleVoiceGrowthChild(
        guildId,
        channel.id,
        master.channel_id.toString(),
        channel.name,
      );
    });
    return;
  }
}
