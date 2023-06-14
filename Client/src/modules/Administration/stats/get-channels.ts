import { ChannelType, Collection, Guild, GuildBasedChannel } from 'discord.js';
import { setGuildStat } from '../../../database/handlers';

export async function getChannels(guild: Guild): Promise<void> {
  const channels: Collection<string, GuildBasedChannel> =
    guild.channels.cache.filter(
      (channel) => channel.type !== ChannelType.GuildCategory,
    );

  const channelsCount: number = channels.size;
  await setGuildStat(
    guild.id,
    'channels',
    -1,
    channelsCount.toString(),
    channelsCount,
  );

  const textChannels: Collection<string, GuildBasedChannel> =
    guild.channels.cache.filter(
      (channel: GuildBasedChannel) => channel.type === ChannelType.GuildText,
    );
  const textChannelsCount: number = textChannels.size;
  await setGuildStat(
    guild.id,
    'textChannels',
    -1,
    textChannelsCount.toString(),
    textChannelsCount,
  );

  const voiceChannels: Collection<string, GuildBasedChannel> =
    guild.channels.cache.filter(
      (channel: GuildBasedChannel) => channel.type === ChannelType.GuildVoice,
    );
  const voiceChannelsCount: number = voiceChannels.size;
  await setGuildStat(
    guild.id,
    'voiceChannels',
    -1,
    voiceChannelsCount.toString(),
    voiceChannelsCount,
  );
}
