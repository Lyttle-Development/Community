import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildService } from './guild.service';
import { Guild } from './entities/guild.entity';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { GuildModuleLevel } from '../guild-module-level/entities/guild-module-level.entity';

@Resolver(() => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Guild)
  createGuild(
    @Args('createGuildInput') createGuildInput: CreateGuildInput,
  ): Promise<Guild> {
    return this.guildService.create(createGuildInput);
  }

  @Query(() => [Guild], { name: 'guild' })
  findAll(): Promise<Guild[]> {
    return this.guildService.findAll();
  }

  @Query(() => Guild, { name: 'guild' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  @Mutation(() => Guild)
  updateGuild(
    @Args('updateGuildInput, id') updateGuildInput: UpdateGuildInput,
    id: number,
  ): Promise<Guild> {
    return this.guildService.update(id, updateGuildInput);
  }

  @Mutation(() => Guild)
  removeGuild(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.guildService.remove(id);
  }

  @ResolveField(() => GuildModuleLevel)
  getModuleLevel(@Parent() guild: Guild): Promise<GuildModuleLevel> {
    return this.guildService.getGuildModuleLevel(guild.guild_id);
  }
}
