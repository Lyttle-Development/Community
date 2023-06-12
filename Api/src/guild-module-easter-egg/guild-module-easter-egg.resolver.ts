import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildModuleEasterEggService } from './guild-module-easter-egg.service';
import { GuildModuleEasterEgg } from './entities/guild-module-easter-egg.entity';
import { CreateGuildModuleEasterEggInput } from './dto/create-guild-module-easter-egg.input';
import { UpdateGuildModuleEasterEggInput } from './dto/update-guild-module-easter-egg.input';

@Resolver(() => GuildModuleEasterEgg)
export class GuildModuleEasterEggResolver {
  constructor(private readonly guildModuleEasterEggService: GuildModuleEasterEggService) {}

  @Mutation(() => GuildModuleEasterEgg)
  createGuildModuleEasterEgg(@Args('createGuildModuleEasterEggInput') createGuildModuleEasterEggInput: CreateGuildModuleEasterEggInput) {
    return this.guildModuleEasterEggService.create(createGuildModuleEasterEggInput);
  }

  @Query(() => [GuildModuleEasterEgg], { name: 'guildModuleEasterEgg' })
  findAll() {
    return this.guildModuleEasterEggService.findAll();
  }

  @Query(() => GuildModuleEasterEgg, { name: 'guildModuleEasterEgg' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleEasterEggService.findOne(id);
  }

  @Mutation(() => GuildModuleEasterEgg)
  updateGuildModuleEasterEgg(@Args('updateGuildModuleEasterEggInput') updateGuildModuleEasterEggInput: UpdateGuildModuleEasterEggInput) {
    return this.guildModuleEasterEggService.update(updateGuildModuleEasterEggInput.id, updateGuildModuleEasterEggInput);
  }

  @Mutation(() => GuildModuleEasterEgg)
  removeGuildModuleEasterEgg(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleEasterEggService.remove(id);
  }
}
