import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  ): Promise<GuildModuleCountToNumber> {
    return this.guildModuleCountToNumberService.create(
      createGuildModuleCountToNumberInput,
    );
  }

  @Query(() => [GuildModuleCountToNumber], { name: 'guildModuleCountToNumber' })
  findAll(): Promise<GuildModuleCountToNumber[]> {
    return this.guildModuleCountToNumberService.findAll();
  }

  @Query(() => GuildModuleCountToNumber, { name: 'guildModuleCountToNumber' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleCountToNumber> {
    return this.guildModuleCountToNumberService.findOne(id);
  }

  @Mutation(() => GuildModuleCountToNumber)
  updateGuildModuleCountToNumber(
    @Args('updateGuildModuleCountToNumberInput')
    updateGuildModuleCountToNumberInput: UpdateGuildModuleCountToNumberInput,
  ): Promise<GuildModuleCountToNumber> | null {
    return this.guildModuleCountToNumberService.update(
      updateGuildModuleCountToNumberInput.guildId,
      updateGuildModuleCountToNumberInput,
    );
  }

  @Mutation(() => GuildModuleCountToNumber)
  removeGuildModuleCountToNumber(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleCountToNumber> | null {
    return this.guildModuleCountToNumberService.remove(id);
  }
}
