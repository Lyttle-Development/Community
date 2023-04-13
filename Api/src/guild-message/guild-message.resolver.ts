import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildMessageService } from './guild-message.service';
import { GuildMessage } from './entities/guild-message.entity';
import { CreateGuildMessageInput } from './dto/create-guild-message.input';
import { UpdateGuildMessageInput } from './dto/update-guild-message.input';

@Resolver(() => GuildMessage)
export class GuildMessageResolver {
  constructor(private readonly guildMessageService: GuildMessageService) {}

  @Mutation(() => GuildMessage)
  createGuildMessage(
    @Args('createGuildMessageInput')
    createGuildMessageInput: CreateGuildMessageInput,
  ): Promise<GuildMessage> {
    return this.guildMessageService.create(createGuildMessageInput);
  }

  @Query(() => [GuildMessage], { name: 'guildMessage' })
  findAll(): Promise<GuildMessage[]> {
    return this.guildMessageService.findAll();
  }

  @Query(() => GuildMessage, { name: 'guildMessage' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<GuildMessage> {
    return this.guildMessageService.findOne(id);
  }

  @Mutation(() => GuildMessage)
  updateGuildMessage(
    @Args('updateGuildMessageInput')
    updateGuildMessageInput: UpdateGuildMessageInput,
  ): Promise<GuildMessage> | null {
    return this.guildMessageService.update(
      updateGuildMessageInput.id,
      updateGuildMessageInput,
    );
  }

  @Mutation(() => GuildMessage)
  removeGuildMessage(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildMessage> | null {
    return this.guildMessageService.remove(id);
  }
}
