import { Injectable } from '@nestjs/common';
import type { CreateMemberModuleLevelInput } from './dto/create-member-module-level.input';
import type { UpdateMemberModuleLevelInput } from './dto/update-member-module-level.input';

@Injectable()
export class MemberModuleLevelService {
  create(createMemberModuleLevelInput: CreateMemberModuleLevelInput) {
    return 'This action adds a new memberModuleLevel';
  }

  findAll() {
    return `This action returns all memberModuleLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberModuleLevel`;
  }

  update(id: number, updateMemberModuleLevelInput: UpdateMemberModuleLevelInput) {
    return `This action updates a #${id} memberModuleLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberModuleLevel`;
  }
}
