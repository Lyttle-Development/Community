import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildTranslationService } from './guild-translation.service';
import { GuildTranslation } from './entities/guild-translation.entity';
import { CreateGuildTranslationInput } from './dto/create-guild-translation.input';
import { UpdateGuildTranslationInput } from './dto/update-guild-translation.input';
import { Guild } from '../guild/entities/guild.entity';

@Resolver(() => GuildTranslation)
export class GuildTranslationResolver {
  constructor(
    private readonly guildTranslationService: GuildTranslationService,
  ) {}

  @Mutation(() => GuildTranslation)
  createGuildTranslation(
    @Args('createGuildTranslationInput')
    createGuildTranslationInput: CreateGuildTranslationInput,
  ): Promise<GuildTranslation> {
    return this.guildTranslationService.create(createGuildTranslationInput);
  }

  @Query(() => [GuildTranslation])
  findAll(): Promise<GuildTranslation[]> {
    return this.guildTranslationService.findAll();
  }

  @Query(() => [GuildTranslation])
  findAllByGuild(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildTranslation[]> {
    return this.guildTranslationService.findAllByGuild(id);
  }

  @Query(() => GuildTranslation)
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('key', { type: () => String }) key: string,
  ): Promise<GuildTranslation> {
    return this.guildTranslationService.findOne(id, key);
  }

  @ResolveField(() => GuildTranslation)
  guild(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.guildTranslationService.getGuild(id);
  }

  @Mutation(() => GuildTranslation)
  updateGuildTranslation(
    @Args('updateGuildTranslationInput')
    updateGuildTranslationInput: UpdateGuildTranslationInput,
  ): Promise<GuildTranslation> | null {
    return this.guildTranslationService.update(updateGuildTranslationInput);
  }

  @Mutation(() => GuildTranslation)
  removeGuildTranslation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GuildTranslation> | null {
    return this.guildTranslationService.remove(id);
  }
}
