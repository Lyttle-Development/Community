import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuildModuleBirthdayService } from './guild-module-birthday.service';
import { GuildModuleBirthday } from './entities/guild-module-birthday.entity';
import { CreateGuildModuleBirthdayInput } from './dto/create-guild-module-birthday.input';
import { UpdateGuildModuleBirthdayInput } from './dto/update-guild-module-birthday.input';

@Resolver(() => GuildModuleBirthday)
export class GuildModuleBirthdayResolver {
  constructor(private readonly guildModuleBirthdayService: GuildModuleBirthdayService) {}

  @Mutation(() => GuildModuleBirthday)
  createGuildModuleBirthday(@Args('createGuildModuleBirthdayInput') createGuildModuleBirthdayInput: CreateGuildModuleBirthdayInput) {
    return this.guildModuleBirthdayService.create(createGuildModuleBirthdayInput);
  }

  @Query(() => [GuildModuleBirthday], { name: 'guildModuleBirthday' })
  findAll() {
    return this.guildModuleBirthdayService.findAll();
  }

  @Query(() => GuildModuleBirthday, { name: 'guildModuleBirthday' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleBirthdayService.findOne(id);
  }

  @Mutation(() => GuildModuleBirthday)
  updateGuildModuleBirthday(@Args('updateGuildModuleBirthdayInput') updateGuildModuleBirthdayInput: UpdateGuildModuleBirthdayInput) {
    return this.guildModuleBirthdayService.update(updateGuildModuleBirthdayInput.id, updateGuildModuleBirthdayInput);
  }

  @Mutation(() => GuildModuleBirthday)
  removeGuildModuleBirthday(@Args('id', { type: () => Int }) id: number) {
    return this.guildModuleBirthdayService.remove(id);
  }
}
