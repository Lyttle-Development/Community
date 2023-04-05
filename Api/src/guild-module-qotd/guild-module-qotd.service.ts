import { Injectable } from '@nestjs/common';
import { CreateGuildModuleQotdInput } from './dto/create-guild-module-qotd.input';
import { UpdateGuildModuleQotdInput } from './dto/update-guild-module-qotd.input';

@Injectable()
export class GuildModuleQotdService {
  create(createGuildModuleQotdInput: CreateGuildModuleQotdInput) {
    return 'This action adds a new guildModuleQotd';
  }

  findAll() {
    return `This action returns all guildModuleQotd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleQotd`;
  }

  update(id: number, updateGuildModuleQotdInput: UpdateGuildModuleQotdInput) {
    return `This action updates a #${id} guildModuleQotd`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleQotd`;
  }
}
