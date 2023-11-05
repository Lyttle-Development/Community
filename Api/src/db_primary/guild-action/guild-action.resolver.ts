import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildActionService } from './guild-action.service';
import { GuildAction } from './entities/guild-action.entity';
import { CreateGuildActionInput } from './dto/create-guild-action.input';
import { UpdateGuildActionInput } from './dto/update-guild-action.input';
import { Guild } from '../guild/entities/guild.entity';

@Resolver(() => GuildAction)
export class GuildActionResolver {
  constructor(private readonly guildActionService: GuildActionService) {}

  @Mutation(() => GuildAction)
  createGuildAction(
    @Args('createGuildActionInput')
    createGuildActionInput: CreateGuildActionInput,
  ) {
    return this.guildActionService.create(createGuildActionInput);
  }

  @Query(() => [GuildAction], { name: 'guildActions' })
  findAll() {
    return this.guildActionService.findAll();
  }

  @Query(() => GuildAction, { name: 'guildAction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildActionService.findOne(id);
  }

  @ResolveField(() => Guild)
  getGuild(@Parent() guildAction: GuildAction): Promise<Guild> {
    return this.guildActionService.getGuild(guildAction.guildId);
  }

  @Mutation(() => GuildAction)
  updateGuildAction(
    @Args('updateGuildActionInput')
    updateGuildActionInput: UpdateGuildActionInput,
  ) {
    return this.guildActionService.update(
      updateGuildActionInput.id,
      updateGuildActionInput,
    );
  }

  @Mutation(() => GuildAction)
  removeGuildAction(@Args('id', { type: () => Int }) id: number) {
    return this.guildActionService.remove(id);
  }
}
