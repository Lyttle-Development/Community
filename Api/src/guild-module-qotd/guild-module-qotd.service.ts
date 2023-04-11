import { Injectable } from '@nestjs/common';
import type { CreateGuildModuleQotdInput } from './dto/create-guild-module-qotd.input';
import type { UpdateGuildModuleQotdInput } from './dto/update-guild-module-qotd.input';
import { GuildModuleQotd } from './entities/guild-module-qotd.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildModuleQotdService {
  constructor(
    @InjectRepository(GuildModuleQotd)
    private guildModuleQotdRepository: Repository<GuildModuleQotd>,
  ) {}

  create(createGuildModuleQotdInput: CreateGuildModuleQotdInput) {
    return 'This action adds a new guildModuleQotd';
  }

  findAll() {
    return `This action returns all guildModuleQotd`;
  }

  findOne(id: number): Promise<GuildModuleQotd> {
    return this.guildModuleQotdRepository.findOne({
      where: { guild_id: id },
    });
  }

  update(id: number, updateGuildModuleQotdInput: UpdateGuildModuleQotdInput) {
    return `This action updates a #${id} guildModuleQotd`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleQotd`;
  }
}
