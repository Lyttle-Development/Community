import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildService } from './guild.service';
import { Guild } from './entities/guild.entity';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';

@Resolver(() => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Guild)
  createGuild(@Args('createGuildInput') createGuildInput: CreateGuildInput) {
    return this.guildService.create(createGuildInput);
  }

  @Query(() => [Guild], { name: 'guild' })
  findAll() {
    return this.guildService.findAll();
  }

  @Query(() => Guild, { name: 'guild' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildService.findOne(id);
  }

  @Mutation(() => Guild)
  updateGuild(@Args('updateGuildInput') updateGuildInput: UpdateGuildInput) {
    return this.guildService.update(updateGuildInput.id, updateGuildInput);
  }

  @Mutation(() => Guild)
  removeGuild(@Args('id', { type: () => Int }) id: number) {
    return this.guildService.remove(id);
  }
}
