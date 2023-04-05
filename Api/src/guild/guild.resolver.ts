import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuildService } from './guild.service';
import { Guild } from './entities/guild.entity';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { GuildModuleLevel } from '../guild-module-level/entities/guild-module-level.entity';
import { GuildModuleQotd } from '../guild-module-qotd/entities/guild-module-qotd.entity';
import { GuildMessage } from 'src/guild-message/entities/guild-message.entity';
import { GuildTranslation } from '../guild-translation/entities/guild-translation.entity';
import { Member } from '../member/entities/member.entity';

@Resolver(() => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Guild)
  createGuild(
    @Args('createGuildInput') createGuildInput: CreateGuildInput,
  ): Promise<Guild> {
    return this.guildService.create(createGuildInput);
  }

  @Query(() => [Guild], { name: 'guilds' })
  findAll(): Promise<Guild[]> {
    return this.guildService.findAll();
  }

  @Query(() => Guild, { name: 'guild' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  @Mutation(() => Guild)
  updateGuild(
    @Args('updateGuildInput, id') updateGuildInput: UpdateGuildInput,
    id: number,
  ): Promise<Guild> {
    return this.guildService.update(id, updateGuildInput);
  }

  @Mutation(() => Guild)
  removeGuild(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.guildService.remove(id);
  }

  @ResolveField(() => GuildModuleLevel)
  moduleLevel(@Parent() guild: Guild): Promise<GuildModuleLevel> {
    return this.guildService.getGuildModuleLevel(guild.guild_id);
  }

  @ResolveField(() => GuildModuleQotd)
  moduleQotd(@Parent() guild: Guild): Promise<GuildModuleQotd> {
    return this.guildService.getGuildModuleQotd(guild.guild_id);
  }

  @ResolveField(() => GuildMessage)
  guildMessage(@Parent() guild: Guild, id: number): Promise<GuildMessage> {
    return this.guildService.getGuildMessage(guild.guild_id, id);
  }

  @ResolveField(() => [GuildMessage])
  guildMessages(@Parent() guild: Guild): Promise<GuildMessage[]> {
    return this.guildService.getGuildMessages(guild.guild_id);
  }

  @ResolveField(() => [GuildTranslation])
  guildTranslations(@Parent() guild: Guild): Promise<GuildTranslation[]> {
    return this.guildService.getGuildTranslations(guild.guild_id);
  }

  @ResolveField(() => Member)
  member(@Parent() guild: Guild, id: number): Promise<Member> {
    return this.guildService.getMember(guild.guild_id, id);
  }

  @ResolveField(() => [Member])
  members(@Parent() guild: Guild): Promise<Member[]> {
    return this.guildService.getMembers(guild.guild_id);
  }

  @ResolveField(() => GuildTranslation)
  guildTranslation(
    @Parent() guild: Guild,
    key: string,
  ): Promise<GuildTranslation> {
    return this.guildService.getGuildTranslation(guild.guild_id, key);
  }
}
