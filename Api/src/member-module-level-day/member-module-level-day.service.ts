import { Injectable } from '@nestjs/common';
import type { CreateMemberModuleLevelDayInput } from './dto/create-member-module-level-day.input';
import type { UpdateMemberModuleLevelDayInput } from './dto/update-member-module-level-day.input';
import { Repository } from 'typeorm';
import { MemberModuleLevelDay } from './entities/member-module-level-day.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberModuleLevelDayService {
  constructor(
    @InjectRepository(MemberModuleLevelDay)
    private memberModuleLevelDayRepository: Repository<MemberModuleLevelDay>,
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
