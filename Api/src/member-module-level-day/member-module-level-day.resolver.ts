import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MemberModuleLevelDayService } from './member-module-level-day.service';
import { MemberModuleLevelDay } from './entities/member-module-level-day.entity';
import { CreateMemberModuleLevelDayInput } from './dto/create-member-module-level-day.input';
import { UpdateMemberModuleLevelDayInput } from './dto/update-member-module-level-day.input';
import { Guild } from '../guild/entities/guild.entity';
import { Member } from '../member/entities/member.entity';

@Resolver(() => MemberModuleLevelDay)
export class MemberModuleLevelDayResolver {
  constructor(
    private readonly memberModuleLevelDayService: MemberModuleLevelDayService,
  ) {}

  @Mutation(() => MemberModuleLevelDay)
  createMemberModuleLevelDay(
    @Args('createMemberModuleLevelDayInput')
    createMemberModuleLevelDayInput: CreateMemberModuleLevelDayInput,
  ): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelDayService.create(
      createMemberModuleLevelDayInput,
    );
  }

  @Query(() => [MemberModuleLevelDay])
  findAll(): Promise<MemberModuleLevelDay[]> {
    return this.memberModuleLevelDayService.findAll();
  }

  @Query(() => MemberModuleLevelDay)
  findOne(
    @Args('guildId', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelDayService.findOne(guildId, userId);
  }

  @ResolveField(() => Guild)
  guild(@Parent() memberModuleLevelDay: MemberModuleLevelDay): Promise<Guild> {
    return this.memberModuleLevelDayService.getGuild(
      memberModuleLevelDay.guild_id,
    );
  }

  @ResolveField(() => Member)
  member(
    @Parent() memberModuleLevelDay: MemberModuleLevelDay,
  ): Promise<Member> {
    return this.memberModuleLevelDayService.getMember(
      memberModuleLevelDay.guild_id,
      memberModuleLevelDay.user_id,
    );
  }

  @Mutation(() => MemberModuleLevelDay)
  updateMemberModuleLevelDay(
    @Args('updateMemberModuleLevelDayInput')
    updateMemberModuleLevelDayInput: UpdateMemberModuleLevelDayInput,
  ): Promise<MemberModuleLevelDay> | null {
    return this.memberModuleLevelDayService.update(
      updateMemberModuleLevelDayInput,
    );
  }

  @Mutation(() => MemberModuleLevelDay)
  removeMemberModuleLevelDay(
    @Args('guildId', { type: () => Int }) guildId: number,
    userId1: number,
  ): Promise<MemberModuleLevelDay> | null {
    return this.memberModuleLevelDayService.remove(guildId, userId1);
  }
}
