import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildModuleVoiceGrowthService } from './guild-module-voice-growth.service';
import { GuildModuleVoiceGrowth } from './entities/guild-module-voice-growth.entity';
import { CreateGuildModuleVoiceGrowthInput } from './dto/create-guild-module-voice-growth.input';
import { UpdateGuildModuleVoiceGrowthInput } from './dto/update-guild-module-voice-growth.input';
import { Guild } from '../guild/entities/guild.entity';

@Resolver(() => GuildModuleVoiceGrowth)
export class GuildModuleVoiceGrowthResolver {
  constructor(
    private readonly guildModuleVoiceGrowthService: GuildModuleVoiceGrowthService,
  ) {}

  @Mutation(() => GuildModuleVoiceGrowth)
  createGuildModuleVoiceGrowth(
    @Args('createGuildModuleVoiceGrowthInput')
    createGuildModuleVoiceGrowthInput: CreateGuildModuleVoiceGrowthInput,
  ): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthService.create(
      createGuildModuleVoiceGrowthInput,
    );
  }

  @Query(() => [GuildModuleVoiceGrowth])
  findAll(): Promise<GuildModuleVoiceGrowth[]> {
    return this.guildModuleVoiceGrowthService.findAll();
  }

  @Query(() => GuildModuleVoiceGrowth)
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildModuleVoiceGrowth> | null {
    return this.guildModuleVoiceGrowthService.findOne(id);
  }

  @ResolveField(() => Guild)
  guild(
    @Parent() guildModuleVoiceGrowth: GuildModuleVoiceGrowth,
  ): Promise<Guild> {
    return this.guildModuleVoiceGrowthService.getGuild(
      guildModuleVoiceGrowth.guild_id,
    );
  }

  @Mutation(() => GuildModuleVoiceGrowth)
  updateGuildModuleVoiceGrowth(
    @Args('updateGuildModuleVoiceGrowthInput')
    updateGuildModuleVoiceGrowthInput: UpdateGuildModuleVoiceGrowthInput,
  ) {
    return this.guildModuleVoiceGrowthService.update(
      updateGuildModuleVoiceGrowthInput.id,
      updateGuildModuleVoiceGrowthInput,
    );
  }

  @Mutation(() => GuildModuleVoiceGrowth)
  removeGuildModuleVoiceGrowth(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildModuleVoiceGrowth> | null {
    return this.guildModuleVoiceGrowthService.remove(id);
  }
}
