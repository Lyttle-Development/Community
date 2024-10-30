import { Query, Resolver } from '@nestjs/graphql';
import { GuildStat } from './entities/guild-stat.entity';
import { GuildTranslation } from '../guild-translation/entities/guild-translation.entity';
import { GuildStatService } from './guild-stat.service';
import { Public } from '../auth/discord.guard';

@Resolver(() => GuildStat)
export class GuildStatResolver {
  constructor(private readonly guildStatService: GuildStatService) {}

  @Public()
  @Query(() => GuildStat)
  getGeneralStats(): Promise<GuildTranslation> {
    return this.guildStatService.getGeneralStats();
  }
}
