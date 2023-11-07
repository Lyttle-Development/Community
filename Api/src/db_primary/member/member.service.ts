import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateMemberInput } from './dto/create-member.input';
import type { UpdateMemberInput } from './dto/update-member.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { MemberModuleLevelService } from 'db_primary/member-module-level/member-module-level.service';
import { UserService } from '../user/user.service';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';
import { User } from '../user/entities/user.entity';
import { MemberModuleLevel } from '../member-module-level/entities/member-module-level.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @Inject(forwardRef(() => MemberModuleLevelService))
    private memberModuleLevelService: MemberModuleLevelService,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  create(createMemberInput: CreateMemberInput): Promise<Member> {
    return this.memberRepository.save(createMemberInput);
  }

  createBulk(
    createMemberInput: CreateMemberInput[],
  ): Promise<CreateMemberInput[]> {
    return this.memberRepository.save(createMemberInput);
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  findAllByGuild(guildId: string): Promise<Member[]> {
    return this.memberRepository.find({
      where: { guildId: guildId },
    });
  }

  findOne(userId: string, guildId: string): Promise<Member> {
    return this.memberRepository.findOne({
      where: { userId: userId, guildId: guildId },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  getUser(id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  getMemberModuleLevel(
    guildId: string,
    userId: string,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelService.findOne(guildId, userId);
  }

  async update(updateMemberInput: UpdateMemberInput): Promise<Member> | null {
    const member: Member = await this.memberRepository.findOne({
      where: {
        userId: updateMemberInput.userId,
        guildId: updateMemberInput.guildId,
      },
    });
    if (member) {
      return this.memberRepository.save({ ...member, ...updateMemberInput });
    }
    throw new Error('Member not found');
  }

  async remove(guildId: string, userId: string): Promise<Member> | null {
    const member: Member = await this.memberRepository.findOne({
      where: {
        userId: userId,
        guildId: guildId,
      },
    });
    if (member) {
      return this.memberRepository.remove(member);
    }
    throw new Error('Member not found');
  }
}
