import { Injectable } from '@nestjs/common';
import { CreateGuildModuleBirthdayInput } from './dto/create-guild-module-birthday.input';
import { UpdateGuildModuleBirthdayInput } from './dto/update-guild-module-birthday.input';

@Injectable()
export class GuildModuleBirthdayService {
  create(createGuildModuleBirthdayInput: CreateGuildModuleBirthdayInput) {
    return 'This action adds a new guildModuleBirthday';
  }

  findAll() {
    return `This action returns all guildModuleBirthday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleBirthday`;
  }

  update(id: number, updateGuildModuleBirthdayInput: UpdateGuildModuleBirthdayInput) {
    return `This action updates a #${id} guildModuleBirthday`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleBirthday`;
  }
}
