import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GuildStatResolvedService } from '../guild-stat-resolved/guild-stat-resolved.service';
import { DiscordService } from '../discord/discord.service';
import { Configuration, OpenAIApi } from 'openai';
import { GuildStatService } from '../guild-stat/guild-stat.service';
import { OpenAi } from './entities/open-ai.entity';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  constructor(
    @Inject(forwardRef(() => GuildStatResolvedService))
    private guildStatResolvedService: GuildStatResolvedService,
    @Inject(forwardRef(() => GuildStatService))
    private guildStatService: GuildStatService,
    @Inject(forwardRef(() => DiscordService))
    private discordService: DiscordService,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  create(guildId: string | null = null): OpenAi {
    return { guildId } as OpenAi;
  }

  async createRecommendation(prompt, maxTokens = 100): Promise<string | null> {
    const result = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: prompt,
      max_tokens: maxTokens,
    });

    return result?.data?.choices[0]?.message?.content ?? null;
  }

  async getOrCreateRecommendation(guildId: string): Promise<string> {
    const statKey = 'openAiRecommendation';
    const guildStatOpenAiRecommendation = await this.guildStatService.findOne(
      guildId,
      statKey,
      -1,
    );

    if (guildStatOpenAiRecommendation) {
      return guildStatOpenAiRecommendation.value;
    }
    const newAiRecommendation = await this.createRecommendationWithGuildStat(
      guildId,
    );
    if (newAiRecommendation) {
      await this.guildStatService.createOrUpdate(
        guildId,
        statKey,
        -1,
        newAiRecommendation,
      );
    }
    return newAiRecommendation ?? 'Try again later...';
  }

  async createRecommendationWithGuildStat(
    guildId: string,
  ): Promise<string | null> {
    const guildStatStaffMembers: number =
      await this.guildStatResolvedService.getStaffMembers(guildId);
    const guildStatBots: number = await this.guildStatResolvedService.getBots(
      guildId,
    );
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
        role: 'system',
        content:
          'Your a discord bot trying to summarize in a few sentences, how to improve the server.\n' +
          'Rules:\n' +
          '- One continues text\n' +
          '- No bullet points\n',
      },
      {
        role: 'user',
        content: `Server name: ${guild?.name}
Staff: ${guildStatStaffMembers}
Bots: ${guildStatBots}
Members: ${guild?.approximate_member_count}
Text channels: ${guildStatTextChannels} 
Messages per channel: 
${Object.entries(guildStatTextChannelsMessages)
  .map(([key, value], i) => ` - ${++i}: ${value}`)
  .join('\n')}
Voice channels: ${guildStatVoiceChannels}
Time in voice channel (combined last week): 
${Object.entries(guildStatVoiceChannelsCallTime)
  .map(
    ([, value], i) =>
      ` - ${++i}: ${Math.round((value / 1000 / 60) * 100) / 100} min`,
  )
  .join('\n')}`,
      },
    ];

    return await this.createRecommendation(prompt);
  }
}
