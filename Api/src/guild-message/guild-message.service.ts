import { Injectable } from '@nestjs/common';
import { CreateGuildMessageInput } from './dto/create-guild-message.input';
import { UpdateGuildMessageInput } from './dto/update-guild-message.input';

@Injectable()
export class GuildMessageService {
  create(createGuildMessageInput: CreateGuildMessageInput) {
    return 'This action adds a new guildMessage';
  }

  findAll() {
    return `This action returns all guildMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildMessage`;
  }

  update(id: number, updateGuildMessageInput: UpdateGuildMessageInput) {
    return `This action updates a #${id} guildMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildMessage`;
  }
}
