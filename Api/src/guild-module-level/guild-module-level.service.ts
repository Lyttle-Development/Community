import { Injectable } from '@nestjs/common';
import { CreateGuildModuleLevelInput } from './dto/create-guild-module-level.input';
import { UpdateGuildModuleLevelInput } from './dto/update-guild-module-level.input';
import { GuildModuleLevel } from './entities/guild-module-level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../guild/entities/guild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildModuleLevelService {
  constructor(
    @InjectRepository(Guild)
    private guildModuleLevelRepository: Repository<GuildModuleLevel>,
  ) {}

  create(createGuildModuleLevelInput: CreateGuildModuleLevelInput) {
    return 'This action adds a new guildModuleLevel';
  }

  findAll() {
    return `This action returns all guildModuleLevel`;
  }

  findOne(id: number): Promise<GuildModuleLevel> {
    return this.guildModuleLevelRepository.findOne({
      where: { guild_id: id },
    });
  }

  update(id: number, updateGuildModuleLevelInput: UpdateGuildModuleLevelInput) {
    return `This action updates a #${id} guildModuleLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleLevel`;
  }
}
