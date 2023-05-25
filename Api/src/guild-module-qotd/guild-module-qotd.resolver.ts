import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildModuleQotdService } from './guild-module-qotd.service';
import { GuildModuleQotd } from './entities/guild-module-qotd.entity';
import { CreateGuildModuleQotdInput } from './dto/create-guild-module-qotd.input';
import { UpdateGuildModuleQotdInput } from './dto/update-guild-module-qotd.input';

@Resolver(() => GuildModuleQotd)
export class GuildModuleQotdResolver {
  constructor(
    private readonly guildModuleQotdService: GuildModuleQotdService,
  ) {}

  @Mutation(() => GuildModuleQotd)
  createGuildModuleQotd(
    @Args('createGuildModuleQotdInput')
    createGuildModuleQotdInput: CreateGuildModuleQotdInput,
  ): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.create(createGuildModuleQotdInput);
  }

  @Query(() => [GuildModuleQotd], { name: 'guildModuleQotd' })
  findAll(): Promise<GuildModuleQotd[]> {
    return this.guildModuleQotdService.findAll();
  }

  @Query(() => GuildModuleQotd, { name: 'guildModuleQotd' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.findOne(id);
  }

  @Mutation(() => GuildModuleQotd)
  updateGuildModuleQotd(
    @Args('updateGuildModuleQotdInput')
    updateGuildModuleQotdInput: UpdateGuildModuleQotdInput,
  ): Promise<GuildModuleQotd> | null {
    return this.guildModuleQotdService.update(
      updateGuildModuleQotdInput.id,
      updateGuildModuleQotdInput,
    );
  }

  @Mutation(() => GuildModuleQotd)
  removeGuildModuleQotd(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildModuleQotd> | null {
    return this.guildModuleQotdService.remove(id);
  }
}
