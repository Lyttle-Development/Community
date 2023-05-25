import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ): Promise<Member> {
    return this.memberService.create(createMemberInput);
  }

  @Query(() => [Member], { name: 'member' })
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Query(() => Member, { name: 'member' })
  findOne(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('guildId', { type: () => Int }) guildId: number,
  ): Promise<Member> {
    return this.memberService.findOne(userId, guildId);
  }

  @Mutation(() => Member)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ): Promise<Member> | null {
    return this.memberService.update(updateMemberInput);
  }

  @Mutation(() => Member)
  removeMember(
    @Args('id', { type: () => Int }) guildId: number,
    userId: number,
  ): Promise<Member> | null {
    return this.memberService.remove(guildId, userId);
  }
}
