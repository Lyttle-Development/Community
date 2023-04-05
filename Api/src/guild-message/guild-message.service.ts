import { Injectable } from '@nestjs/common';
import { CreateGuildMessageInput } from './dto/create-guild-message.input';
import { UpdateGuildMessageInput } from './dto/update-guild-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildMessage } from './entities/guild-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildMessageService {
  constructor(
    @InjectRepository(GuildMessage)
    private guildMessageRepository: Repository<GuildMessage>,
  ) {}

  create(createGuildMessageInput: CreateGuildMessageInput) {
    return 'This action adds a new guildMessage';
  }

  findAll(): Promise<GuildMessage[]> {
    return this.guildMessageRepository.find();
  }

  findOne(id: number): Promise<GuildMessage> {
    return this.guildMessageRepository.findOne({
      where: { guild_id: id },
    });
  }

  update(id: number, updateGuildMessageInput: UpdateGuildMessageInput) {
    return `This action updates a #${id} guildMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildMessage`;
  }
}
