import { Injectable } from '@nestjs/common';
import type { CreateMemberInput } from './dto/create-member.input';
import type { UpdateMemberInput } from './dto/update-member.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create(createMemberInput: CreateMemberInput): Promise<Member> {
    return this.memberRepository.save(createMemberInput);
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  findAllByGuild(guild_id: number): Promise<Member[]> {
    return this.memberRepository.find({
      where: { guild_id: guild_id },
    });
  }

  findOne(user_id: number, guild_id: number): Promise<Member> {
    return this.memberRepository.findOne({
      where: { user_id: user_id, guild_id: guild_id },
    });
  }

  async update(updateMemberInput: UpdateMemberInput): Promise<Member> | null {
    const member: Member = await this.memberRepository.findOne({
      where: {
        user_id: updateMemberInput.user_id,
        guild_id: updateMemberInput.guild_id,
      },
    });
    if (member) {
      return this.memberRepository.save({ ...member, ...updateMemberInput });
    }
    throw new Error('Member not found');
  }

  async remove(guildId: number, userId: number): Promise<Member> | null {
    const member: Member = await this.memberRepository.findOne({
      where: {
        user_id: userId,
        guild_id: guildId,
      },
    });
    if (member) {
      return this.memberRepository.remove(member);
    }
    throw new Error('Member not found');
  }
}
