import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildModuleEasterEggService } from './guild-module-easter-egg.service';
import { GuildModuleEasterEgg } from './entities/guild-module-easter-egg.entity';
import { CreateGuildModuleEasterEggInput } from './dto/create-guild-module-easter-egg.input';
import { UpdateGuildModuleEasterEggInput } from './dto/update-guild-module-easter-egg.input';
import { Guild } from '../guild/entities/guild.entity';

@Resolver(() => GuildModuleEasterEgg)
export class GuildModuleEasterEggResolver {
  constructor(
    private readonly guildModuleEasterEggService: GuildModuleEasterEggService,
  ) {}

  @Mutation(() => GuildModuleEasterEgg)
  createGuildModuleEasterEgg(
    @Args('createGuildModuleEasterEggInput')
    createGuildModuleEasterEggInput: CreateGuildModuleEasterEggInput,
  ): Promise<GuildModuleEasterEgg> {
    return this.guildModuleEasterEggService.create(
      createGuildModuleEasterEggInput,
    );
  }

  @Query(() => [GuildModuleEasterEgg], { name: 'guildModuleEasterEgg' })
  findAll(): Promise<GuildModuleEasterEgg[]> {
    return this.guildModuleEasterEggService.findAll();
  }

  @Query(() => GuildModuleEasterEgg, { name: 'guildModuleEasterEgg' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleEasterEgg> {
    return this.guildModuleEasterEggService.findOne(id);
  }

  @ResolveField(() => Guild)
  guild(@Parent() guildModuleEasterEgg: GuildModuleEasterEgg): Promise<Guild> {
    return this.guildModuleEasterEggService.getGuild(
      guildModuleEasterEgg.guildId,
    );
  }

  @Mutation(() => GuildModuleEasterEgg)
  updateGuildModuleEasterEgg(
    @Args('updateGuildModuleEasterEggInput')
    updateGuildModuleEasterEggInput: UpdateGuildModuleEasterEggInput,
  ): Promise<GuildModuleEasterEgg> {
    return this.guildModuleEasterEggService.update(
      updateGuildModuleEasterEggInput.guildId,
      updateGuildModuleEasterEggInput,
    );
  }

  @Mutation(() => GuildModuleEasterEgg)
  removeGuildModuleEasterEgg(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleEasterEgg> {
    return this.guildModuleEasterEggService.remove(id);
  }
}
