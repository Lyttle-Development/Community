import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevel } from './entities/member-module-level.entity';
import { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';

@Resolver(() => MemberModuleLevel)
export class MemberModuleLevelResolver {
  constructor(private readonly memberModuleLevelService: MemberModuleLevelService) {}

  @Mutation(() => MemberModuleLevel)
  createMemberModuleLevel(@Args('createMemberModuleLevelInput') createMemberModuleLevelInput: CreateMemberModuleLevelInput) {
    return this.memberModuleLevelService.create(createMemberModuleLevelInput);
  }

  @Query(() => [MemberModuleLevel], { name: 'memberModuleLevel' })
  findAll() {
    return this.memberModuleLevelService.findAll();
  }

  @Query(() => MemberModuleLevel, { name: 'memberModuleLevel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.memberModuleLevelService.findOne(id);
  }

  @Mutation(() => MemberModuleLevel)
  updateMemberModuleLevel(@Args('updateMemberModuleLevelInput') updateMemberModuleLevelInput: UpdateMemberModuleLevelInput) {
    return this.memberModuleLevelService.update(updateMemberModuleLevelInput.id, updateMemberModuleLevelInput);
  }

  @Mutation(() => MemberModuleLevel)
  removeMemberModuleLevel(@Args('id', { type: () => Int }) id: number) {
    return this.memberModuleLevelService.remove(id);
  }
}
