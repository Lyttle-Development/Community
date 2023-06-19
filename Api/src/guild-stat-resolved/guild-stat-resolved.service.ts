import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GuildStatService } from '../guild-stat/guild-stat.service';
import { GuildStatResolved } from './entities/guild-stat-resolved.entity';

@Injectable()
export class GuildStatResolvedService {
  constructor(
    @Inject(forwardRef(() => GuildStatService))
    private guildStatService: GuildStatService,
  ) {}

  create(guildId: string | null = null): GuildStatResolved {
    return { guildId } as GuildStatResolved;
  }

  async getStaffMembersIds(guildId: string | null = null): Promise<string[]> {
    if (!guildId) return [];

    const result = await this.guildStatService.findOne(
      guildId,
      'staffMembersIds',
      -1,
    );

    const ids = result?.value?.split(',') ?? null;
    return ids ?? [];
  }

  async getStaffMembers(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findOne(
      guildId,
      'staffMembers',
      -1,
    );
    return result?.valueInt ?? 0;
  }

  async getBots(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findOne(guildId, 'bots', -1);
    return result?.valueInt ?? 0;
  }

  async getEventsTriggered(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findAllByGroup(
      guildId,
      'eventsTriggered',
    );

    return result.reduce((acc, curr) => acc + (curr?.valueInt ?? 0), 0);
  }

  async getEventsCreated(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findAllByGroup(
      guildId,
      'eventsCreated',
    );

    return result.reduce((acc, curr) => acc + (curr?.valueInt ?? 0), 0);
  }

  async getActivity(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findAllByGroup(
      guildId,
      'activity',
    );

    return result.reduce((acc, curr) => acc + (curr?.valueInt ?? 0), 0);
  }

  async getChannels(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findOne(guildId, 'channels', -1);

    return result?.valueInt ?? 0;
  }

  async getTextChannels(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findOne(
      guildId,
      'textChannels',
      -1,
    );
    return result.valueInt ?? 0;
  }

  async getTextChannelsMessages(
    guildId: string | null = null,
  ): Promise<object> {
    if (!guildId) return {};

    const result = await this.guildStatService.findAllByGroup(
      guildId,
      'textChannelMessages',
    );

    return result.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.key]: curr?.valueInt,
      }),
      {},
    );
  }

  async getVoiceChannels(guildId: string | null = null): Promise<number> {
    if (!guildId) return 0;

    const result = await this.guildStatService.findOne(
      guildId,
      'voiceChannels',
      -1,
    );
    return result?.valueInt ?? 0;
  }

  async getVoiceChannelsCallTime(
    guildId: string | null = null,
  ): Promise<object> {
    if (!guildId) return {};

    const result = await this.guildStatService.findAllByGroup(
      guildId,
      'voiceChannelsCallTime',
    );

    return result.reduce((acc, curr) => {
      const oldValue = acc[curr.key] ?? 0;
      return {
        ...acc,
        [curr.key]: oldValue + curr?.valueInt ?? 0,
      };
    }, {});
  }
}
