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
  guild(@Parent() discord: Discord): Promise<object> {
    return this.discordService.getGuild(discord.guildId);
  }

  @ResolveField(() => [GraphQLJSONObject])
  guildChannels(@Parent() discord: Discord): Promise<object[]> {
    return this.discordService.getGuildChannels(discord.guildId);
  }
}
