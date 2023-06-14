import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildModuleCountToNumberService } from './guild-module-count-to-number.service';
import { GuildModuleCountToNumber } from './entities/guild-module-count-to-number.entity';
import { CreateGuildModuleCountToNumberInput } from './dto/create-guild-module-count-to-number.input';
import { UpdateGuildModuleCountToNumberInput } from './dto/update-guild-module-count-to-number.input';

@Resolver(() => GuildModuleCountToNumber)
export class GuildModuleCountToNumberResolver {
  constructor(
    private readonly guildModuleCountToNumberService: GuildModuleCountToNumberService,
  ) {}

  @Mutation(() => GuildModuleCountToNumber)
  createGuildModuleCountToNumber(
    @Args('createGuildModuleCountToNumberInput')
    createGuildModuleCountToNumberInput: CreateGuildModuleCountToNumberInput,
  ) {
    return this.guildModuleCountToNumberService.create(
      createGuildModuleCountToNumberInput,
    );
  }

  @Query(() => [GuildModuleCountToNumber], { name: 'guildModuleCountToNumber' })
  findAll() {
    return this.guildModuleCountToNumberService.findAll();
  }

  @Query(() => GuildModuleCountToNumber, { name: 'guildModuleCountToNumber' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleCountToNumberService.findOne(id);
  }

  @Mutation(() => GuildModuleCountToNumber)
  updateGuildModuleCountToNumber(
    @Args('updateGuildModuleCountToNumberInput')
    updateGuildModuleCountToNumberInput: UpdateGuildModuleCountToNumberInput,
  ) {
    return this.guildModuleCountToNumberService.update(
      updateGuildModuleCountToNumberInput.id,
      updateGuildModuleCountToNumberInput,
    );
  }

  @Mutation(() => GuildModuleCountToNumber)
  removeGuildModuleCountToNumber(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleCountToNumberService.remove(id);
  }
}
