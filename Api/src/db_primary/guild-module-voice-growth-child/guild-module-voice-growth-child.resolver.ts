import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';
import { GuildModuleVoiceGrowthChild } from './entities/guild-module-voice-growth-child.entity';
import { CreateGuildModuleVoiceGrowthChildInput } from './dto/create-guild-module-voice-growth-child.input';
import { UpdateGuildModuleVoiceGrowthChildInput } from './dto/update-guild-module-voice-growth-child.input';
import { GuildModuleVoiceGrowth } from '../guild-module-voice-growth/entities/guild-module-voice-growth.entity';

@Resolver(() => GuildModuleVoiceGrowthChild)
export class GuildModuleVoiceGrowthChildResolver {
  constructor(
    private readonly guildModuleVoiceGrowthChildService: GuildModuleVoiceGrowthChildService,
  ) {}

  @Mutation(() => GuildModuleVoiceGrowthChild)
  createGuildModuleVoiceGrowthChild(
    @Args('createGuildModuleVoiceGrowthChildInput')
    createGuildModuleVoiceGrowthChildInput: CreateGuildModuleVoiceGrowthChildInput,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildService.create(
      createGuildModuleVoiceGrowthChildInput,
    );
  }

  @Query(() => [GuildModuleVoiceGrowthChild], {
    name: 'guildModuleVoiceGrowthChild',
  })
  findAll(): Promise<GuildModuleVoiceGrowthChild[]> {
    return this.guildModuleVoiceGrowthChildService.findAll();
  }

  @Query(() => GuildModuleVoiceGrowthChild, {
    name: 'guildModuleVoiceGrowthChild',
  })
  findOne(
    @Args('guildId', { type: () => String }) guildId: string,
    @Args('channelId', { type: () => String }) channelId: string,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildService.findOne(guildId, channelId);
  }

  @ResolveField(() => GuildModuleVoiceGrowth)
  guildModuleVoiceGrowthChild(
    @Parent() guildModuleVoiceGrowthChild: GuildModuleVoiceGrowthChild,
  ): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthChildService.getGuildModuleVoiceGrowth(
      guildModuleVoiceGrowthChild.guildId,
    );
  }

  @Mutation(() => GuildModuleVoiceGrowthChild)
  updateGuildModuleVoiceGrowthChild(
    @Args('updateGuildModuleVoiceGrowthChildInput')
    updateGuildModuleVoiceGrowthChildInput: UpdateGuildModuleVoiceGrowthChildInput,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildService.update(
      updateGuildModuleVoiceGrowthChildInput.guildId,
      updateGuildModuleVoiceGrowthChildInput.channelId,
      updateGuildModuleVoiceGrowthChildInput,
    );
  }

  @Mutation(() => GuildModuleVoiceGrowthChild)
  removeGuildModuleVoiceGrowthChild(
    @Args('guildId', { type: () => String }) guildId: string,
    @Args('channelId', { type: () => String }) channelId: string,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildService.remove(guildId, channelId);
  }
}
