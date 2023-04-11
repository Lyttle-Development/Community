import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuildTranslationService } from './guild-translation.service';
import { GuildTranslation } from './entities/guild-translation.entity';
import { CreateGuildTranslationInput } from './dto/create-guild-translation.input';
import { UpdateGuildTranslationInput } from './dto/update-guild-translation.input';

@Resolver(() => GuildTranslation)
export class GuildTranslationResolver {
  constructor(
    private readonly guildTranslationService: GuildTranslationService,
  ) {}

  @Mutation(() => GuildTranslation)
  createGuildTranslation(
    @Args('createGuildTranslationInput')
    createGuildTranslationInput: CreateGuildTranslationInput,
  ) {
    return this.guildTranslationService.create(createGuildTranslationInput);
  }

  @Query(() => [GuildTranslation], { name: 'guildTranslation' })
  findAll() {
    return this.guildTranslationService.findAll();
  }

  @Query(() => GuildTranslation, { name: 'guildTranslation' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('key', { type: () => String }) key: string,
  ) {
    return this.guildTranslationService.findOne(id, key);
  }

  @Mutation(() => GuildTranslation)
  updateGuildTranslation(
    @Args('updateGuildTranslationInput')
    updateGuildTranslationInput: UpdateGuildTranslationInput,
  ) {
    return this.guildTranslationService.update(
      updateGuildTranslationInput.id,
      updateGuildTranslationInput,
    );
  }

  @Mutation(() => GuildTranslation)
  removeGuildTranslation(@Args('id', { type: () => Int }) id: number) {
    return this.guildTranslationService.remove(id);
  }
}
