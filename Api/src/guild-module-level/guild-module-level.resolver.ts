import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildModuleLevelService } from './guild-module-level.service';
import { GuildModuleLevel } from './entities/guild-module-level.entity';
import { CreateGuildModuleLevelInput } from './dto/create-guild-module-level.input';
import { UpdateGuildModuleLevelInput } from './dto/update-guild-module-level.input';

@Resolver(() => GuildModuleLevel)
export class GuildModuleLevelResolver {
  constructor(private readonly guildModuleLevelService: GuildModuleLevelService) {}

  @Mutation(() => GuildModuleLevel)
  createGuildModuleLevel(@Args('createGuildModuleLevelInput') createGuildModuleLevelInput: CreateGuildModuleLevelInput) {
    return this.guildModuleLevelService.create(createGuildModuleLevelInput);
  }

  @Query(() => [GuildModuleLevel], { name: 'guildModuleLevel' })
  findAll() {
    return this.guildModuleLevelService.findAll();
  }

  @Query(() => GuildModuleLevel, { name: 'guildModuleLevel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleLevelService.findOne(id);
  }

  @Mutation(() => GuildModuleLevel)
  updateGuildModuleLevel(@Args('updateGuildModuleLevelInput') updateGuildModuleLevelInput: UpdateGuildModuleLevelInput) {
    return this.guildModuleLevelService.update(updateGuildModuleLevelInput.id, updateGuildModuleLevelInput);
  }

  @Mutation(() => GuildModuleLevel)
  removeGuildModuleLevel(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleLevelService.remove(id);
  }
}
