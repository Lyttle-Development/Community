import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildModuleVoiceGrowthService } from './guild-module-voice-growth.service';
import { GuildModuleVoiceGrowth } from './entities/guild-module-voice-growth.entity';
import { CreateGuildModuleVoiceGrowthInput } from './dto/create-guild-module-voice-growth.input';
import { UpdateGuildModuleVoiceGrowthInput } from './dto/update-guild-module-voice-growth.input';

@Resolver(() => GuildModuleVoiceGrowth)
export class GuildModuleVoiceGrowthResolver {
  constructor(private readonly guildModuleVoiceGrowthService: GuildModuleVoiceGrowthService) {}

  @Mutation(() => GuildModuleVoiceGrowth)
  createGuildModuleVoiceGrowth(@Args('createGuildModuleVoiceGrowthInput') createGuildModuleVoiceGrowthInput: CreateGuildModuleVoiceGrowthInput) {
    return this.guildModuleVoiceGrowthService.create(createGuildModuleVoiceGrowthInput);
  }

  @Query(() => [GuildModuleVoiceGrowth], { name: 'guildModuleVoiceGrowth' })
  findAll() {
    return this.guildModuleVoiceGrowthService.findAll();
  }

  @Query(() => GuildModuleVoiceGrowth, { name: 'guildModuleVoiceGrowth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleVoiceGrowthService.findOne(id);
  }

  @Mutation(() => GuildModuleVoiceGrowth)
  updateGuildModuleVoiceGrowth(@Args('updateGuildModuleVoiceGrowthInput') updateGuildModuleVoiceGrowthInput: UpdateGuildModuleVoiceGrowthInput) {
    return this.guildModuleVoiceGrowthService.update(updateGuildModuleVoiceGrowthInput.id, updateGuildModuleVoiceGrowthInput);
  }

  @Mutation(() => GuildModuleVoiceGrowth)
  removeGuildModuleVoiceGrowth(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleVoiceGrowthService.remove(id);
  }
}
