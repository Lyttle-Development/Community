import { Injectable } from '@nestjs/common';
import { CreateGuildActionInput } from './dto/create-guild-action.input';
import { UpdateGuildActionInput } from './dto/update-guild-action.input';

@Injectable()
export class GuildActionService {
  create(createGuildActionInput: CreateGuildActionInput) {
    return 'This action adds a new guildAction';
  }

  findAll() {
    return `This action returns all guildAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildAction`;
  }

  update(id: number, updateGuildActionInput: UpdateGuildActionInput) {
    return `This action updates a #${id} guildAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildAction`;
  }
}
