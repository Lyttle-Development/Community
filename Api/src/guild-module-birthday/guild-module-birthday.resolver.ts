import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildModuleBirthdayService } from './guild-module-birthday.service';
import { GuildModuleBirthday } from './entities/guild-module-birthday.entity';
import { CreateGuildModuleBirthdayInput } from './dto/create-guild-module-birthday.input';
import { UpdateGuildModuleBirthdayInput } from './dto/update-guild-module-birthday.input';
import { Guild } from '../guild/entities/guild.entity';

@Resolver(() => GuildModuleBirthday)
export class GuildModuleBirthdayResolver {
  constructor(
    private readonly guildModuleBirthdayService: GuildModuleBirthdayService,
  ) {}

  @Mutation(() => GuildModuleBirthday)
  createGuildModuleBirthday(
    @Args('createGuildModuleBirthdayInput')
    createGuildModuleBirthdayInput: CreateGuildModuleBirthdayInput,
  ): Promise<GuildModuleBirthday> | null {
    return this.guildModuleBirthdayService.create(
      createGuildModuleBirthdayInput,
    );
  }

  @Query(() => [GuildModuleBirthday], { name: 'guildModuleBirthday' })
  findAll(): Promise<GuildModuleBirthday[]> {
    return this.guildModuleBirthdayService.findAll();
  }

  @Query(() => GuildModuleBirthday, { name: 'guildModuleBirthday' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleBirthday> {
    return this.guildModuleBirthdayService.findOne(id);
  }

  @ResolveField(() => Guild)
  guild(@Parent() guildModuleBirthday: GuildModuleBirthday): Promise<Guild> {
    return this.guildModuleBirthdayService.getGuild(
      guildModuleBirthday.guildId,
    );
  }

  @Mutation(() => GuildModuleBirthday)
  updateGuildModuleBirthday(
    @Args('updateGuildModuleBirthdayInput')
    updateGuildModuleBirthdayInput: UpdateGuildModuleBirthdayInput,
  ): Promise<GuildModuleBirthday> | null {
    return this.guildModuleBirthdayService.update(
      updateGuildModuleBirthdayInput.guildId,
      updateGuildModuleBirthdayInput,
    );
  }

  @Mutation(() => GuildModuleBirthday)
  removeGuildModuleBirthday(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GuildModuleBirthday> | null {
    return this.guildModuleBirthdayService.remove(id);
  }
}
