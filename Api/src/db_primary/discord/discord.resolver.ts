import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DiscordService } from './discord.service';
import { Discord } from './entities/discord.entity';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthorizationToken } from '../auth/discord.guard';

@Resolver(() => Discord)
export class DiscordResolver {
  constructor(private readonly discordService: DiscordService) {}

  @Query(() => Discord)
  discord(): Discord {
    return this.discordService.create();
  }

  @ResolveField(() => [GraphQLJSONObject])
  userGuilds(@AuthorizationToken() token: string): Promise<object[]> {
    return this.discordService.getUserGuilds(token);
  }

  @ResolveField(() => GraphQLJSONObject)
  user(@AuthorizationToken() token: string): Promise<object> {
    return this.discordService.getUser(token);
  }

  @ResolveField(() => [GraphQLJSONObject])
  memberGuilds(@AuthorizationToken() token: string): Promise<object[]> {
    return this.discordService.getUserPermittedGuilds(token);
  }

  @ResolveField(() => [GraphQLJSONObject])
  dashboardUserGuilds(@AuthorizationToken() token: string): Promise<object[]> {
    return this.discordService.getDashboardGuilds(token);
  }

  @ResolveField(() => GraphQLJSONObject)
  guild(@Parent() discord: Discord): Promise<object> {
    return this.discordService.getGuild(discord.guildId);
  }

  @ResolveField(() => [GraphQLJSONObject])
  guildChannels(@Parent() discord: Discord): Promise<object[]> {
    return this.discordService.getGuildChannels(discord.guildId);
  }

  @ResolveField(() => [GraphQLJSONObject])
  guildCategoryChannels(@Parent() discord: Discord): Promise<object[]> {
    return this.discordService.getGuildCategoryChannels(discord.guildId);
  }

  @ResolveField(() => [GraphQLJSONObject])
  guildTextChannels(@Parent() discord: Discord): Promise<object[]> {
    return this.discordService.getGuildTextChannels(discord.guildId);
  }

  @ResolveField(() => [GraphQLJSONObject])
  guildVoiceChannels(@Parent() discord: Discord): Promise<object[]> {
    return this.discordService.getGuildVoiceChannels(discord.guildId);
  }
}
