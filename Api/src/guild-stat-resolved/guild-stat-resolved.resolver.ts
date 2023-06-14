import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GuildStatResolvedService } from './guild-stat-resolved.service';
import { GuildStatResolved } from './entities/guild-stat-resolved.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => GuildStatResolved)
export class GuildStatResolvedResolver {
  constructor(
    private readonly guildStatResolvedService: GuildStatResolvedService,
  ) {}

  @Query(() => GuildStatResolved)
  guildStat(
    @Args('guildId', { type: () => String }) guildId: string,
  ): GuildStatResolved {
    return this.guildStatResolvedService.create(guildId);
  }

  @ResolveField(() => [String])
  staffMembersIds(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<string[]> {
    return this.guildStatResolvedService.getStaffMembersIds(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => Number)
  staffMembers(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<number> {
    return this.guildStatResolvedService.getStaffMembers(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => Number)
  bots(@Parent() guildStatResolved: GuildStatResolved): Promise<number> {
    return this.guildStatResolvedService.getBots(guildStatResolved.guildId);
  }

  @ResolveField(() => Number)
  eventsCreated(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<number> {
    return this.guildStatResolvedService.getEventsCreated(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => Number)
  eventsTriggered(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<number> {
    return this.guildStatResolvedService.getEventsTriggered(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => Number)
  activity(@Parent() guildStatResolved: GuildStatResolved): Promise<number> {
    return this.guildStatResolvedService.getActivity(guildStatResolved.guildId);
  }

  @ResolveField(() => Number)
  channels(@Parent() guildStatResolved: GuildStatResolved): Promise<number> {
    return this.guildStatResolvedService.getChannels(guildStatResolved.guildId);
  }

  @ResolveField(() => Number)
  textChannels(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<number> {
    return this.guildStatResolvedService.getTextChannels(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => GraphQLJSONObject)
  textChannelsMessages(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<object> {
    return this.guildStatResolvedService.getTextChannelsMessages(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => Number)
  voiceChannels(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<number> {
    return this.guildStatResolvedService.getVoiceChannels(
      guildStatResolved.guildId,
    );
  }

  @ResolveField(() => GraphQLJSONObject)
  voiceChannelsCallTime(
    @Parent() guildStatResolved: GuildStatResolved,
  ): Promise<object> {
    return this.guildStatResolvedService.getVoiceChannelsCallTime(
      guildStatResolved.guildId,
    );
  }
}
