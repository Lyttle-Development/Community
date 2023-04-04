import { Injectable } from '@nestjs/common';
import { CreateGuildModuleLevelInput } from './dto/create-guild-module-level.input';
import { UpdateGuildModuleLevelInput } from './dto/update-guild-module-level.input';

@Injectable()
export class GuildModuleLevelService {
  create(createGuildModuleLevelInput: CreateGuildModuleLevelInput) {
    return 'This action adds a new guildModuleLevel';
  }

  findAll() {
    return `This action returns all guildModuleLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleLevel`;
  }

  update(id: number, updateGuildModuleLevelInput: UpdateGuildModuleLevelInput) {
    return `This action updates a #${id} guildModuleLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleLevel`;
  }
}
