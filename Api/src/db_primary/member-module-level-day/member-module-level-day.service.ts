import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateMemberModuleLevelDayInput } from './dto/create-member-module-level-day.input';
import type { UpdateMemberModuleLevelDayInput } from './dto/update-member-module-level-day.input';
import { Repository } from 'typeorm';
import { MemberModuleLevelDay } from './entities/member-module-level-day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from '../member/member.service';
import { GuildService } from '../guild/guild.service';
import { Member } from '../member/entities/member.entity';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class MemberModuleLevelDayService {
  constructor(
    @InjectRepository(MemberModuleLevelDay)
    private memberModuleLevelDayRepository: Repository<MemberModuleLevelDay>,
    @Inject(forwardRef(() => MemberService))
    private memberService: MemberService,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(createMemberModuleLevelDayInput: CreateMemberModuleLevelDayInput) {
    const memberModuleLevelDay: MemberModuleLevelDay =
      this.memberModuleLevelDayRepository.create(
        createMemberModuleLevelDayInput,
      );
    return this.memberModuleLevelDayRepository.save(memberModuleLevelDay);
  }

  findAll(): Promise<MemberModuleLevelDay[]> {
    return this.memberModuleLevelDayRepository.find();
  }

  findOne(guildId: string, userId: string): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelDayRepository.findOne({
      where: { guildId: guildId, userId: userId },
    });
  }

  getMember(guildId: string, userId: string): Promise<Member> {
    return this.memberService.findOne(guildId, userId);
  }

  getGuild(guildId: string): Promise<Guild> {
    return this.guildService.findOne(guildId);
  }

  async update(
    updateMemberModuleLevelDayInput: UpdateMemberModuleLevelDayInput,
  ): Promise<MemberModuleLevelDay> | null {
    const memberModuleLevelDay: MemberModuleLevelDay =
      await this.memberModuleLevelDayRepository.findOne({
        where: {
          guildId: updateMemberModuleLevelDayInput.guildId,
          userId: updateMemberModuleLevelDayInput.userId,
        },
      });
    if (memberModuleLevelDay) {
      return this.memberModuleLevelDayRepository.save({
        ...memberModuleLevelDay,
        ...updateMemberModuleLevelDayInput,
      });
    }
    throw new Error('MemberModuleLevelDay not found');
  }

  async remove(guildId: string, userId): Promise<MemberModuleLevelDay> | null {
    const memberModuleLevelDay: MemberModuleLevelDay =
      await this.memberModuleLevelDayRepository.findOne({
        where: {
          guildId: guildId,
          userId: userId,
        },
      });
    if (memberModuleLevelDay) {
      return this.memberModuleLevelDayRepository.remove(memberModuleLevelDay);
    }
    throw new Error('MemberModuleLevelDay not found');
  }
}
