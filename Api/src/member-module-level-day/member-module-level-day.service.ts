import { Injectable } from '@nestjs/common';
import { CreateMemberModuleLevelDayInput } from './dto/create-member-module-level-day.input';
import { UpdateMemberModuleLevelDayInput } from './dto/update-member-module-level-day.input';

@Injectable()
export class MemberModuleLevelDayService {
  create(createMemberModuleLevelDayInput: CreateMemberModuleLevelDayInput) {
    return 'This action adds a new memberModuleLevelDay';
  }

  findAll() {
    return `This action returns all memberModuleLevelDay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberModuleLevelDay`;
  }

  update(id: number, updateMemberModuleLevelDayInput: UpdateMemberModuleLevelDayInput) {
    return `This action updates a #${id} memberModuleLevelDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberModuleLevelDay`;
  }
}
