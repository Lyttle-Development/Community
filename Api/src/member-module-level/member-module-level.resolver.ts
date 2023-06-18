import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevel } from './entities/member-module-level.entity';
import { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';
import { Guild } from '../guild/entities/guild.entity';
import { Member } from '../member/entities/member.entity';
import { MemberModuleLevelDay } from '../member-module-level-day/entities/member-module-level-day.entity';

@Resolver(() => MemberModuleLevel)
export class MemberModuleLevelResolver {
  constructor(
    private readonly memberModuleLevelService: MemberModuleLevelService,
  ) {}

  @Mutation(() => MemberModuleLevel)
  createMemberModuleLevel(
    @Args('createMemberModuleLevelInput')
    createMemberModuleLevelInput: CreateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelService.create(createMemberModuleLevelInput);
  }

  @Query(() => [MemberModuleLevel])
  findAll(): Promise<MemberModuleLevel[]> {
    return this.memberModuleLevelService.findAll();
  }

  @Query(() => MemberModuleLevel)
  findOne(
    @Args('id', { type: () => String }) guildId: string,
    userId: string,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelService.findOne(guildId, userId);
  }

  @ResolveField(() => MemberModuleLevelDay)
  memberModuleLevelDay(
    @Parent() memberModuleLevel: MemberModuleLevel,
  ): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelService.getMemberModuleLevelDay(
      memberModuleLevel.guildId,
      memberModuleLevel.userId,
    );
  }

  @ResolveField(() => Guild)
  guild(@Parent() memberModuleLevel: MemberModuleLevel): Promise<Guild> {
    return this.memberModuleLevelService.getGuild(memberModuleLevel.guildId);
  }

  @ResolveField(() => Member)
  member(@Parent() memberModuleLevel: MemberModuleLevel): Promise<Member> {
    return this.memberModuleLevelService.getMember(
      memberModuleLevel.guildId,
      memberModuleLevel.userId,
    );
  }

  @Mutation(() => MemberModuleLevel)
  updateMemberModuleLevel(
    @Args('updateMemberModuleLevelInput')
    updateMemberModuleLevelInput: UpdateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> | null {
    return this.memberModuleLevelService.update(updateMemberModuleLevelInput);
  }

  @Mutation(() => MemberModuleLevel)
  removeMemberModuleLevel(
    @Args('id', { type: () => String }) guildId: string,
    userId: string,
  ): Promise<MemberModuleLevel> | null {
    return this.memberModuleLevelService.remove(guildId, userId);
  }
}
