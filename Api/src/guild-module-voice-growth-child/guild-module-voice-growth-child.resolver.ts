import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';
import { GuildModuleVoiceGrowthChild } from './entities/guild-module-voice-growth-child.entity';
import { CreateGuildModuleVoiceGrowthChildInput } from './dto/create-guild-module-voice-growth-child.input';
import { UpdateGuildModuleVoiceGrowthChildInput } from './dto/update-guild-module-voice-growth-child.input';

@Resolver(() => GuildModuleVoiceGrowthChild)
export class GuildModuleVoiceGrowthChildResolver {
  constructor(
    private readonly guildModuleVoiceGrowthChildService: GuildModuleVoiceGrowthChildService,
  ) {}

  @Mutation(() => GuildModuleVoiceGrowthChild)
  createGuildModuleVoiceGrowthChild(
    @Args('createGuildModuleVoiceGrowthChildInput')
    createGuildModuleVoiceGrowthChildInput: CreateGuildModuleVoiceGrowthChildInput,
  ) {
    return this.guildModuleVoiceGrowthChildService.create(
      createGuildModuleVoiceGrowthChildInput,
    );
  }

  @Query(() => [GuildModuleVoiceGrowthChild], {
    name: 'guildModuleVoiceGrowthChild',
  })
  findAll() {
    return this.guildModuleVoiceGrowthChildService.findAll();
  }

  @Query(() => GuildModuleVoiceGrowthChild, {
    name: 'guildModuleVoiceGrowthChild',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleVoiceGrowthChildService.findOne(id);
  }

  @Mutation(() => GuildModuleVoiceGrowthChild)
  updateGuildModuleVoiceGrowthChild(
    @Args('updateGuildModuleVoiceGrowthChildInput')
    updateGuildModuleVoiceGrowthChildInput: UpdateGuildModuleVoiceGrowthChildInput,
  ) {
    return this.guildModuleVoiceGrowthChildService.update(
      updateGuildModuleVoiceGrowthChildInput.id,
      updateGuildModuleVoiceGrowthChildInput,
    );
  }

  @Mutation(() => GuildModuleVoiceGrowthChild)
  removeGuildModuleVoiceGrowthChild(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.guildModuleVoiceGrowthChildService.remove(id);
  }
}
