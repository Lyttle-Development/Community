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

  findOne(id: string): Promise<GuildModuleLevel> {
    return this.guildModuleLevelRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: string,
    updateGuildModuleLevelInput: UpdateGuildModuleLevelInput,
  ): Promise<GuildModuleLevel> | null {
    const guildModuleLevel: GuildModuleLevel =
      await this.guildModuleLevelRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleLevel) {
      return this.guildModuleLevelRepository.save({
        ...guildModuleLevel,
        ...updateGuildModuleLevelInput,
      });
    }
    // If the guildModuleLevel doesn't exist, create it
    const guildModuleLevelInput: CreateGuildModuleLevelInput = {
      guildId: id,
      enabled: updateGuildModuleLevelInput.enabled,
      levelingMultiplier: updateGuildModuleLevelInput.levelingMultiplier,
      announcementChannelId: updateGuildModuleLevelInput.announcementChannelId,
      leaderboardChannelId: updateGuildModuleLevelInput.leaderboardChannelId,
      leaderboardLastWeek: updateGuildModuleLevelInput.leaderboardLastWeek,
      nicknames: updateGuildModuleLevelInput.nicknames,
      lastLeaderboard: updateGuildModuleLevelInput.lastLeaderboard,
    };
    return this.guildModuleLevelRepository.save(guildModuleLevelInput);
  }

  async remove(id: string): Promise<GuildModuleLevel> | null {
    const guildModuleLevel: GuildModuleLevel =
      await this.guildModuleLevelRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleLevel) {
      return this.guildModuleLevelRepository.remove(guildModuleLevel);
    }
    throw new Error('GuildModuleLevel not found');
  }
}
