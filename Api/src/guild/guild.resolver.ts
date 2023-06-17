import {
  Args,
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
import { GuildMessage } from '../guild-message/entities/guild-message.entity';
import { GuildTranslation } from '../guild-translation/entities/guild-translation.entity';
import { Member } from '../member/entities/member.entity';
import { GuildModuleVoiceGrowth } from '../guild-module-voice-growth/entities/guild-module-voice-growth.entity';
import { Discord } from '../discord/entities/discord.entity';
import { GuildStatResolved } from '../guild-stat-resolved/entities/guild-stat-resolved.entity';

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
  findOne(@Args('id', { type: () => String }) id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  @Mutation(() => Guild)
  updateGuild(
    @Args('updateGuildInput') updateGuildInput: UpdateGuildInput,
  ): Promise<Guild> {
    return this.guildService.update(updateGuildInput.guildId, updateGuildInput);
  }

  @Mutation(() => Guild)
  removeGuild(@Args('id', { type: () => String }) id: string): Promise<Guild> {
    return this.guildService.remove(id);
  }

  @ResolveField(() => GuildModuleLevel, { nullable: true })
  moduleLevel(@Parent() guild: Guild): Promise<GuildModuleLevel> {
    return this.guildService.getGuildModuleLevel(guild.guildId);
  }

  @ResolveField(() => GuildModuleQotd, { nullable: true })
  moduleQotd(@Parent() guild: Guild): Promise<GuildModuleQotd> {
    return this.guildService.getGuildModuleQotd(guild.guildId);
  }

  @ResolveField(() => GuildModuleVoiceGrowth, { nullable: true })
  moduleVoiceGrowth(@Parent() guild: Guild): Promise<GuildModuleVoiceGrowth> {
    return this.guildService.getGuildModuleVoiceGrowth(guild.guildId);
  }

  @ResolveField(() => GuildMessage, { nullable: true })
  message(id: string): Promise<GuildMessage> {
    return this.guildService.getGuildMessage(id);
  }

  @ResolveField(() => [GuildMessage], { nullable: true })
  messages(@Parent() guild: Guild): Promise<GuildMessage[]> {
    return this.guildService.getGuildMessages(guild.guildId);
  }

  @ResolveField(() => GuildTranslation, { nullable: true })
  translation(@Parent() guild: Guild, key: string): Promise<GuildTranslation> {
    return this.guildService.getGuildTranslation(guild.guildId, key);
  }

  @ResolveField(() => [GuildTranslation], { nullable: true })
  translations(@Parent() guild: Guild): Promise<GuildTranslation[]> {
    return this.guildService.getGuildTranslations(guild.guildId);
  }

  @ResolveField(() => Member, { nullable: true })
  member(@Parent() guild: Guild, id: string): Promise<Member> {
    return this.guildService.getMember(guild.guildId, id);
  }

  @ResolveField(() => [Member], { nullable: true })
  members(@Parent() guild: Guild): Promise<Member[]> {
    return this.guildService.getMembers(guild.guildId);
  }

  @ResolveField(() => Discord)
  discord(@Parent() guild: Guild): Discord {
    return this.guildService.getDiscord(guild.guildId);
  }

  @ResolveField(() => GuildStatResolved)
  stats(@Parent() guild: Guild): GuildStatResolved {
    return this.guildService.getStats(guild.guildId);
  }
}
