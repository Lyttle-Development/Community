import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GuildStatResolvedService } from './guild-stat-resolved.service';
import { GuildStatResolved } from './entities/guild-stat-resolved.entity';

@Resolver(() => GuildStatResolved)
export class GuildStatResolvedResolver {
  constructor(
    private readonly guildStatResolvedService: GuildStatResolvedService,
  ) {}

  @Query(() => GuildStatResolved)
  guildStat(
    @Args('guildId', { type: () => String }) guildId: string,
  ): GuildStatResolved {
    return this.guildStatResolvedService.create(guildId);
  }

  @ResolveField(() => [String])
  staffMembersIds(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<string[]> {
    return this.guildStatResolvedService.getStaffMembersIds(
      guildStatResolved.guildId,
    );
  }
}
