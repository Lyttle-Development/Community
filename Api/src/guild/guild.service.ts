import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildModuleLevelService } from '../guild-module-level/guild-module-level.service';
import { GuildModuleLevel } from '../guild-module-level/entities/guild-module-level.entity';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private guildRepository: Repository<Guild>,
    @Inject(forwardRef(() => GuildModuleLevelService))
    private guildModuleLevelService: GuildModuleLevelService,
  ) {}

  create(createGuildInput: CreateGuildInput): Promise<Guild> {
    return this.guildRepository.save(createGuildInput);
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

  getGuildModuleLevel(id: number): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(id);
  }

  async update(
    id: number,
    updateGuildInput: UpdateGuildInput,
  ): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guild_id: id },
    });
    if (guild) {
      return this.guildRepository.save({
        ...guild,
        ...updateGuildInput,
      });
    }
    throw new Error('Guild not found');
  }

  async remove(id: number): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guild_id: id },
    });
    if (guild) {
      return this.guildRepository.remove(guild);
    }
    throw new Error('Guild not found');
  }
}
