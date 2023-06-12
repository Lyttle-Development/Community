import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Guild } from '../guild/entities/guild.entity';
import { User } from '../user/entities/user.entity';
import { MemberModuleLevel } from '../member-module-level/entities/member-module-level.entity';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ): Promise<Member> {
    return this.memberService.create(createMemberInput);
  }

  @Query(() => [Member])
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Query(() => Member)
  findOne(
    @Args('userId', { type: () => String }) userId: string,
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Member> {
    return this.memberService.findOne(userId, guildId);
  }

  @Query(() => [Member])
  findAllByGuild(
    @Args('guildId', { type: () => String }) guildId: string,
  ): Promise<Member[]> {
    return this.memberService.findAllByGuild(guildId);
  }

  @ResolveField(() => Guild)
  guild(@Parent() member: Member): Promise<Guild> {
    return this.memberService.getGuild(member.guildId);
  }

  @ResolveField(() => User)
  getUser(@Parent() member: Member): Promise<User> {
    return this.memberService.getUser(member.userId);
  }

  @ResolveField(() => MemberModuleLevel)
  memberModuleLevel(@Parent() member: Member): Promise<MemberModuleLevel> {
    return this.memberService.getMemberModuleLevel(
      member.guildId,
      member.userId,
    );
  }

  @Mutation(() => Member)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ): Promise<Member> | null {
    return this.memberService.update(updateMemberInput);
  }

  @Mutation(() => Member)
  removeMember(
    @Args('id', { type: () => String }) guildId: string,
    userId: string,
  ): Promise<Member> | null {
    return this.memberService.remove(guildId, userId);
  }
}
