import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import type { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';
import { MemberModuleLevel } from './entities/member-module-level.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from 'member/member.service';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';
import { Member } from '../member/entities/member.entity';
import { MemberModuleLevelDay } from '../member-module-level-day/entities/member-module-level-day.entity';
import { MemberModuleLevelDayService } from '../member-module-level-day/member-module-level-day.service';

@Injectable()
export class MemberModuleLevelService {
  constructor(
    @InjectRepository(MemberModuleLevel)
    private memberModuleLevelRepository: Repository<MemberModuleLevel>,
    @Inject(forwardRef(() => MemberService))
    private memberService: MemberService,
    @Inject(forwardRef(() => MemberModuleLevelDayService))
    private memberModuleLevelDayService: MemberModuleLevelDayService,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createMemberModuleLevelInput: CreateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelRepository.save(createMemberModuleLevelInput);
  }

  findAll(): Promise<MemberModuleLevel[]> {
    return this.memberModuleLevelRepository.find();
  }

  findOne(guildId: string, userId: string): Promise<MemberModuleLevel> {
    return this.memberModuleLevelRepository.findOne({
      where: { userId: userId, guildId: guildId },
    });
  }

  getMemberModuleLevelDay(
    guildId: string,
    userId: string,
  ): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelDayService.findOne(guildId, userId);
  }

  getGuild(guildId: string): Promise<Guild> {
    return this.guildService.findOne(guildId);
  }

  getMember(userId: string, guildId: string): Promise<Member> {
    return this.memberService.findOne(guildId, userId);
  }

  async update(
    updateMemberModuleLevelInput: UpdateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> | null {
    const memberModuleLevel: MemberModuleLevel =
      await this.memberModuleLevelRepository.findOne({
        where: {
          guildId: updateMemberModuleLevelInput.guildId,
          userId: updateMemberModuleLevelInput.userId,
        },
      });
    if (memberModuleLevel) {
      return this.memberModuleLevelRepository.save({
        ...memberModuleLevel,
        ...updateMemberModuleLevelInput,
      });
    }
    throw new Error('MemberModuleLevelDay not found');
  }

  async remove(
    guildId: string,
    userId: string,
  ): Promise<MemberModuleLevel> | null {
    const memberModuleLevel: MemberModuleLevel =
      await this.memberModuleLevelRepository.findOne({
        where: {
          guildId: guildId,
          userId: userId,
        },
      });
    if (memberModuleLevel) {
      return this.memberModuleLevelRepository.remove(memberModuleLevel);
    }
    throw new Error('MemberModuleLevelDay not found');
  }
}
