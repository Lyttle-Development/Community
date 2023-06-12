import { Injectable } from '@nestjs/common';
import { CreateGuildModuleEasterEggInput } from './dto/create-guild-module-easter-egg.input';
import { UpdateGuildModuleEasterEggInput } from './dto/update-guild-module-easter-egg.input';

@Injectable()
export class GuildModuleEasterEggService {
  create(createGuildModuleEasterEggInput: CreateGuildModuleEasterEggInput) {
    return 'This action adds a new guildModuleEasterEgg';
  }

  findAll() {
    return `This action returns all guildModuleEasterEgg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleEasterEgg`;
  }

  update(id: number, updateGuildModuleEasterEggInput: UpdateGuildModuleEasterEggInput) {
    return `This action updates a #${id} guildModuleEasterEgg`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleEasterEgg`;
  }
}
