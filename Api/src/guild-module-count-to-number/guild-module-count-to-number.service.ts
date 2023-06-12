import { Injectable } from '@nestjs/common';
import { CreateGuildModuleCountToNumberInput } from './dto/create-guild-module-count-to-number.input';
import { UpdateGuildModuleCountToNumberInput } from './dto/update-guild-module-count-to-number.input';

@Injectable()
export class GuildModuleCountToNumberService {
  create(createGuildModuleCountToNumberInput: CreateGuildModuleCountToNumberInput) {
    return 'This action adds a new guildModuleCountToNumber';
  }

  findAll() {
    return `This action returns all guildModuleCountToNumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleCountToNumber`;
  }

  update(id: number, updateGuildModuleCountToNumberInput: UpdateGuildModuleCountToNumberInput) {
    return `This action updates a #${id} guildModuleCountToNumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleCountToNumber`;
  }
}
