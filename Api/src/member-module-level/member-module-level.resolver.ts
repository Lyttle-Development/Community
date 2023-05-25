import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevel } from './entities/member-module-level.entity';
import { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';

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

  @Query(() => [MemberModuleLevel], { name: 'memberModuleLevel' })
  findAll(): Promise<MemberModuleLevel[]> {
    return this.memberModuleLevelService.findAll();
  }

  @Query(() => MemberModuleLevel, { name: 'memberModuleLevel' })
  findOne(
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelService.findOne(guildId, userId);
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
