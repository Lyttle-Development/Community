import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildActionService } from './guild-action.service';
import { GuildAction } from './entities/guild-action.entity';
import { CreateGuildActionInput } from './dto/create-guild-action.input';
import { UpdateGuildActionInput } from './dto/update-guild-action.input';

@Resolver(() => GuildAction)
export class GuildActionResolver {
  constructor(private readonly guildActionService: GuildActionService) {}

  @Mutation(() => GuildAction)
  createGuildAction(@Args('createGuildActionInput') createGuildActionInput: CreateGuildActionInput) {
    return this.guildActionService.create(createGuildActionInput);
  }

  @Query(() => [GuildAction], { name: 'guildAction' })
  findAll() {
    return this.guildActionService.findAll();
  }

  @Query(() => GuildAction, { name: 'guildAction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildActionService.findOne(id);
  }

  @Mutation(() => GuildAction)
  updateGuildAction(@Args('updateGuildActionInput') updateGuildActionInput: UpdateGuildActionInput) {
    return this.guildActionService.update(updateGuildActionInput.id, updateGuildActionInput);
  }

  @Mutation(() => GuildAction)
  removeGuildAction(@Args('id', { type: () => Int }) id: number) {
    return this.guildActionService.remove(id);
  }
}
