import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create(createMemberInput: CreateMemberInput) {
    return 'This action adds a new member';
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOne({ where: { user_id: id } });
  }

  update(id: number, updateMemberInput: UpdateMemberInput) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
