import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemberModuleLevelDayService } from './member-module-level-day.service';
import { MemberModuleLevelDay } from './entities/member-module-level-day.entity';
import { CreateMemberModuleLevelDayInput } from './dto/create-member-module-level-day.input';
import { UpdateMemberModuleLevelDayInput } from './dto/update-member-module-level-day.input';

@Resolver(() => MemberModuleLevelDay)
export class MemberModuleLevelDayResolver {
  constructor(private readonly memberModuleLevelDayService: MemberModuleLevelDayService) {}

  @Mutation(() => MemberModuleLevelDay)
  createMemberModuleLevelDay(@Args('createMemberModuleLevelDayInput') createMemberModuleLevelDayInput: CreateMemberModuleLevelDayInput) {
    return this.memberModuleLevelDayService.create(createMemberModuleLevelDayInput);
  }

  @Query(() => [MemberModuleLevelDay], { name: 'memberModuleLevelDay' })
  findAll() {
    return this.memberModuleLevelDayService.findAll();
  }

  @Query(() => MemberModuleLevelDay, { name: 'memberModuleLevelDay' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.memberModuleLevelDayService.findOne(id);
  }

  @Mutation(() => MemberModuleLevelDay)
  updateMemberModuleLevelDay(@Args('updateMemberModuleLevelDayInput') updateMemberModuleLevelDayInput: UpdateMemberModuleLevelDayInput) {
    return this.memberModuleLevelDayService.update(updateMemberModuleLevelDayInput.id, updateMemberModuleLevelDayInput);
  }

  @Mutation(() => MemberModuleLevelDay)
  removeMemberModuleLevelDay(@Args('id', { type: () => Int }) id: number) {
    return this.memberModuleLevelDayService.remove(id);
  }
}
