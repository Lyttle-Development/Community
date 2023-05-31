import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildModuleLevelInput } from './dto/create-guild-module-level.input';
import type { UpdateGuildModuleLevelInput } from './dto/update-guild-module-level.input';
import { GuildModuleLevel } from './entities/guild-module-level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guild } from '../guild/entities/guild.entity';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class GuildModuleLevelService {
  constructor(
    @InjectRepository(GuildModuleLevel)
    private guildModuleLevelRepository: Repository<GuildModuleLevel>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createGuildModuleLevelInput: CreateGuildModuleLevelInput,
  ): Promise<GuildModuleLevel> {
    return this.guildModuleLevelRepository.save(createGuildModuleLevelInput);
  }

  findAll(): Promise<GuildModuleLevel[]> {
    return this.guildModuleLevelRepository.find();
  }

  findOne(id: number): Promise<GuildModuleLevel> {
    return this.guildModuleLevelRepository.findOne({
      where: { guild_id: id },
    });
  }

  getGuild(id: number): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: number,
    updateGuildModuleLevelInput: UpdateGuildModuleLevelInput,
  ): Promise<GuildModuleLevel> | null {
    const guildModuleLevel: GuildModuleLevel =
      await this.guildModuleLevelRepository.findOne({
        where: { guild_id: id },
      });
    if (guildModuleLevel) {
      return this.guildModuleLevelRepository.save({
        ...guildModuleLevel,
        ...updateGuildModuleLevelInput,
      });
    }
    throw new Error('GuildModuleLevel not found');
  }

  async remove(id: number): Promise<GuildModuleLevel> | null {
    const guildModuleLevel: GuildModuleLevel =
      await this.guildModuleLevelRepository.findOne({
        where: { guild_id: id },
      });
    if (guildModuleLevel) {
      return this.guildModuleLevelRepository.remove(guildModuleLevel);
    }
    throw new Error('GuildModuleLevel not found');
  }
}
