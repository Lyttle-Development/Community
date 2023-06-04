import {
  Args,
  Int,
  Mutation,
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
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelService.findOne(guildId, userId);
  }

  @ResolveField(() => MemberModuleLevel)
  memberModuleLevelDay(
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelService.getMemberModuleLevelDay(
      guildId,
      userId,
    );
  }

  @ResolveField(() => MemberModuleLevel)
  guild(@Args('id', { type: () => Int }) guildId: number): Promise<Guild> {
    return this.memberModuleLevelService.getGuild(guildId);
  }

  @ResolveField(() => MemberModuleLevel)
  member(
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<Member> {
    return this.memberModuleLevelService.getMember(guildId, userId);
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
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<MemberModuleLevel> | null {
    return this.memberModuleLevelService.remove(guildId, userId);
  }
}
