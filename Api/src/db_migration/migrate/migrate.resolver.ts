import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MigrateService } from './migrate.service';
import { Migrate } from './entities/migrate.entity';

@Resolver(() => Migrate)
export class MigrateResolver {
  constructor(private readonly migrateService: MigrateService) {}

  @Mutation(() => Migrate)
  migrateGuild(@Args('guildId') guildId: string): Promise<Migrate> {
    return this.migrateService.migrateGuild(guildId);
  }
}
