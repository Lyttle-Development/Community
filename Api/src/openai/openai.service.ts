import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GuildStatResolvedService } from '../guild-stat-resolved/guild-stat-resolved.service';
import { DiscordService } from '../discord/discord.service';

const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class OpenaiService {
  private openai: any;

  constructor(
    @Inject(forwardRef(() => GuildStatResolvedService))
    private guildStatResolvedService: GuildStatResolvedService,
    @Inject(forwardRef(() => DiscordService))
    private discordService: DiscordService,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async create(prompt, maxTokens: number = 0.25): Promise<string> {
    const result = await this.openai.complete({
      engine: 'gpt-3.5-turbo',
      maxTokens,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n'],
    });

    return result.data.choices[0].text;
  }

  async createWithGuildStat(guildId: string): Promise<string> {
    const guildStatStaffMembers: number =
      await this.guildStatResolvedService.getStaffMembers(guildId);
    const guildStatBots: number = await this.guildStatResolvedService.getBots(
      guildId,
    );
    const guildStatChannels: number =
      await this.guildStatResolvedService.getChannels(guildId);
    const guildStatTextChannels: number =
      await this.guildStatResolvedService.getTextChannels(guildId);
    const guildStatVoiceChannels: number =
      await this.guildStatResolvedService.getVoiceChannels(guildId);
    const guildStatTextChannelsMessages =
      await this.guildStatResolvedService.getTextChannelsMessages(guildId);
    const guildStatVoiceChannelsCallTime =
      await this.guildStatResolvedService.getVoiceChannelsCallTime(guildId);
    const guild = await this.discordService.getGuild(guildId);
    const prompt = [
      {
        role: 'Discord bot trying to help maximize server activity',
        text: `the server ${guild?.name} has ${guildStatStaffMembers} staff members, ${guildStatBots} bots, ${guildStatChannels} channels, ${guildStatTextChannels} text channels, ${guildStatVoiceChannels} voice channels, ${guildStatTextChannelsMessages} text channels messages, ${guildStatVoiceChannelsCallTime} voice channels call time, and ${guild?.approximate_member_count} members.`,
      },
    ];
    return await this.create(prompt);
  }
}
