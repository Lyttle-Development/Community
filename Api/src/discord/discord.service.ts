import { Injectable } from '@nestjs/common';
import { Discord } from './entities/discord.entity';
import * as process from 'process';

@Injectable()
export class DiscordService {
  create(guildId: string | null = null): Discord {
    return { guildId } as Discord;
  }

  async getGuild(guildId: string): Promise<object> {
    if (!guildId) return null;

    const botToken = process.env.BOT_TOKEN;
    const result = await fetch(
      `https://discord.com/api/guilds/${guildId}?with_counts=true`,
      {
        method: 'GET',
        headers: {
          authorization: `Bot ${botToken}`,
        },
      },
    );

    return (await result.json()) ?? {};
  }

  async getGuildChannels(guildId: string): Promise<object[]> {
    if (!guildId) return null;

    const botToken = process.env.BOT_TOKEN;
    const result = await fetch(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        method: 'GET',
        headers: {
          authorization: `Bot ${botToken}`,
        },
      },
    );

    return (await result.json()) ?? [];
  }

  async getGuildCategoryChannels(guildId: string): Promise<object[]> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels) return null;

    return guildChannels.filter((channel: any) => channel.type === 4);
  }

  async getGuildTextChannels(guildId: string): Promise<object[]> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels) return null;

    return guildChannels.filter((channel: any) => channel.type === 0);
  }

  async getGuildVoiceChannels(guildId: string): Promise<object[]> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels) return null;

    return guildChannels.filter((channel: any) => channel.type === 2);
  }

  async getUserGuilds(token: string): Promise<object[]> {
    if (!token) return null;

    const result = await fetch(
      'https://discord.com/api/users/@me/guilds?with_counts=true',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return (await result.json()) ?? [];
  }
}
