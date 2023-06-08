import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildModuleLevelService } from './guild-module-level.service';
import { GuildModuleLevel } from './entities/guild-module-level.entity';
import { CreateGuildModuleLevelInput } from './dto/create-guild-module-level.input';
import { UpdateGuildModuleLevelInput } from './dto/update-guild-module-level.input';

@Resolver(() => GuildModuleLevel)
export class GuildModuleLevelResolver {
  constructor(
    private readonly guildModuleLevelService: GuildModuleLevelService,
  ) {}

  @Mutation(() => GuildModuleLevel)
  createGuildModuleLevel(
    @Args('createGuildModuleLevelInput')
    createGuildModuleLevelInput: CreateGuildModuleLevelInput,
  ): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.create(createGuildModuleLevelInput);
  }

  @Query(() => [GuildModuleLevel])
  findAll(): Promise<GuildModuleLevel[]> {
    return this.guildModuleLevelService.findAll();
  }

  @Query(() => GuildModuleLevel)
  findOne(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(id);
  }

  @Mutation(() => GuildModuleLevel)
  updateGuildModuleLevel(
    @Args('updateGuildModuleLevelInput')
    updateGuildModuleLevelInput: UpdateGuildModuleLevelInput,
  ): Promise<GuildModuleLevel> | null {
    return this.guildModuleLevelService.update(
      updateGuildModuleLevelInput.guild_id,
      updateGuildModuleLevelInput,
    );
  }

  @Mutation(() => GuildModuleLevel)
  removeGuildModuleLevel(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<GuildModuleLevel> | null {
    return this.guildModuleLevelService.remove(id);
  }
}
