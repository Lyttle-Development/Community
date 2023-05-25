import { Injectable } from '@nestjs/common';
import type { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import type { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';
import { MemberModuleLevel } from './entities/member-module-level.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberModuleLevelService {
  constructor(
    @InjectRepository(MemberModuleLevel)
    private memberModuleLevelRepository: Repository<MemberModuleLevel>,
  ) {}

  create(
    createMemberModuleLevelInput: CreateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> {
    return this.memberModuleLevelRepository.save(createMemberModuleLevelInput);
  }

  findAll(): Promise<MemberModuleLevel[]> {
    return this.memberModuleLevelRepository.find();
  }

  findOne(userId: number, guildId: number): Promise<MemberModuleLevel> {
    return this.memberModuleLevelRepository.findOne({
      where: { user_id: userId, guild_id: guildId },
    });
  }

  async update(
    updateMemberModuleLevelInput: UpdateMemberModuleLevelInput,
  ): Promise<MemberModuleLevel> | null {
    const memberModuleLevel: MemberModuleLevel =
      await this.memberModuleLevelRepository.findOne({
        where: {
          guild_id: updateMemberModuleLevelInput.guild_id,
          user_id: updateMemberModuleLevelInput.user_id,
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
    guildId: number,
    userId: number,
  ): Promise<MemberModuleLevel> | null {
    const memberModuleLevel: MemberModuleLevel =
      await this.memberModuleLevelRepository.findOne({
        where: {
          guild_id: guildId,
          user_id: userId,
        },
      });
    if (memberModuleLevel) {
      return this.memberModuleLevelRepository.remove(memberModuleLevel);
    }
    throw new Error('MemberModuleLevelDay not found');
  }
}
