import { Injectable } from '@nestjs/common';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private guildRepository: Repository<Guild>,
  ) {}

  create(createGuildInput: CreateGuildInput) {
    return 'This action adds a new guild';
  }

  findAll(): Promise<Guild[]> {
    return this.guildRepository.find({
      relations: ['guildMessages', 'members'],
    });
  }

  findOne(id: number): Promise<Guild> {
    return this.guildRepository.findOne({
      where: { guild_id: id },
      relations: ['guildMessages', 'members'],
    });
  }

  update(id: number, updateGuildInput: UpdateGuildInput) {
    return `This action updates a #${id} guild`;
  }

  remove(id: number) {
    return `This action removes a #${id} guild`;
  }
}
