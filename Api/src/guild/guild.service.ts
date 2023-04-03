import { Injectable } from '@nestjs/common';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';

@Injectable()
export class GuildService {
  create(createGuildInput: CreateGuildInput) {
    return 'This action adds a new guild';
  }

  findAll() {
    return `This action returns all guild`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guild`;
  }

  update(id: number, updateGuildInput: UpdateGuildInput) {
    return `This action updates a #${id} guild`;
  }

  remove(id: number) {
    return `This action removes a #${id} guild`;
  }
}
