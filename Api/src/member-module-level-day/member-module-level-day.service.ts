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

  findOne(guildId: number, userId: number): Promise<MemberModuleLevelDay> {
    return this.memberModuleLevelDayRepository.findOne({
      where: { guild_id: guildId, user_id: userId },
    });
  }

  getMember(guildId: number, userId: number): Promise<Member> {
    return this.memberService.findOne(guildId, userId);
  }

  getGuild(guildId: number): Promise<Guild> {
    return this.guildService.findOne(guildId);
  }

  async update(
    updateMemberModuleLevelDayInput: UpdateMemberModuleLevelDayInput,
  ): Promise<MemberModuleLevelDay> | null {
    const memberModuleLevelDay: MemberModuleLevelDay =
      await this.memberModuleLevelDayRepository.findOne({
        where: {
          guild_id: updateMemberModuleLevelDayInput.guild_id,
          user_id: updateMemberModuleLevelDayInput.user_id,
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

  async remove(guildId: number, userId): Promise<MemberModuleLevelDay> | null {
    const memberModuleLevelDay: MemberModuleLevelDay =
      await this.memberModuleLevelDayRepository.findOne({
        where: {
          guild_id: guildId,
          user_id: userId,
        },
      });
    if (memberModuleLevelDay) {
      return this.memberModuleLevelDayRepository.remove(memberModuleLevelDay);
    }
    throw new Error('MemberModuleLevelDay not found');
  }
}
