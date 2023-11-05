import { Args, Query, Resolver } from '@nestjs/graphql';
import { ServerUserLevelService } from './server-user-level.service';
import { ServerUserLevel } from './entities/server-user-level.entity';

@Resolver(() => ServerUserLevel)
export class ServerUserLevelResolver {
  constructor(
    private readonly serverUserLevelService: ServerUserLevelService,
  ) {}

  @Query(() => [ServerUserLevel], { name: 'findAllServerUserLevelsByGuildId' })
  findAllServerUserLevelsByGuildId(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<ServerUserLevel[]> {
    return this.serverUserLevelService.findAllServerUserLevelsByGuildId(
      guildId,
    );
  }
}
