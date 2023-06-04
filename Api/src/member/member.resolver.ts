import {
  Args,
  Int,
  Mutation,
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
    @Args('userId', { type: () => Int }) userId: number,
    @Args('guildId', { type: () => Int }) guildId: number,
  ): Promise<Member> {
    return this.memberService.findOne(userId, guildId);
  }

  @Query(() => [Member])
  findAllByGuild(
    @Args('guildId', { type: () => Int }) guildId: number,
  ): Promise<Member[]> {
    return this.memberService.findAllByGuild(guildId);
  }

  @ResolveField(() => [Member])
  guild(@Args('id', { type: () => Int }) id: number): Promise<Guild> {
    return this.memberService.getGuild(id);
  }

  @ResolveField(() => [Member])
  getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.memberService.getUser(id);
  }

  @ResolveField(() => [Member])
  memberModuleLevel(
    @Args('guildId', { type: () => Int }) guildId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<MemberModuleLevel> {
    return this.memberService.getMemberModuleLevel(guildId, userId);
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
