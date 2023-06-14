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

    return result.value.split(',');
  }
}
