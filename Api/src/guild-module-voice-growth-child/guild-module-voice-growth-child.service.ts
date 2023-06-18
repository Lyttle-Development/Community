import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildModuleVoiceGrowthChildInput } from './dto/create-guild-module-voice-growth-child.input';
import { UpdateGuildModuleVoiceGrowthChildInput } from './dto/update-guild-module-voice-growth-child.input';
import { Repository } from 'typeorm';
import { GuildModuleVoiceGrowthChild } from './entities/guild-module-voice-growth-child.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildModuleVoiceGrowthService } from '../guild-module-voice-growth/guild-module-voice-growth.service';
import { GuildModuleVoiceGrowth } from '../guild-module-voice-growth/entities/guild-module-voice-growth.entity';

@Injectable()
export class GuildModuleVoiceGrowthChildService {
  constructor(
    @InjectRepository(GuildModuleVoiceGrowthChild)
    private guildModuleVoiceGrowthChildRepository: Repository<GuildModuleVoiceGrowthChild>,
    @Inject(forwardRef(() => GuildModuleVoiceGrowthService))
    private guildModuleVoiceGrowthService: GuildModuleVoiceGrowthService,
  ) {}

  async create(
    createGuildModuleVoiceGrowthChildInput: CreateGuildModuleVoiceGrowthChildInput,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildRepository.create(
      createGuildModuleVoiceGrowthChildInput,
    );
  }

  findAll(): Promise<GuildModuleVoiceGrowthChild[]> {
    return this.guildModuleVoiceGrowthChildRepository.find();
  }

  findOne(
    guildId: string,
    channelId: string,
  ): Promise<GuildModuleVoiceGrowthChild> {
    return this.guildModuleVoiceGrowthChildRepository.findOne({
      where: { guildId: guildId, channelId: channelId },
    });
  }

  getGuildModuleVoiceGrowth(guildId: string): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthService.findOne(guildId);
  }

  async update(
    guildId: string,
    channelId: string,
    updateGuildModuleVoiceGrowthChildInput: UpdateGuildModuleVoiceGrowthChildInput,
  ): Promise<GuildModuleVoiceGrowthChild> | null {
    const guildModuleVoiceGrowthChild: GuildModuleVoiceGrowthChild =
      await this.guildModuleVoiceGrowthChildRepository.findOne({
        where: { guildId: guildId, channelId: channelId },
      });
    if (GuildModuleVoiceGrowthChild) {
      return this.guildModuleVoiceGrowthChildRepository.save({
        ...guildModuleVoiceGrowthChild,
        ...updateGuildModuleVoiceGrowthChildInput,
      });
    }
    // If the guildModuleVoiceGrowthChild doesn't exist, create it
    const guildModuleVoiceGrowthChildInput: CreateGuildModuleVoiceGrowthChildInput =
      {
        guildId,
        channelId,
        name: updateGuildModuleVoiceGrowthChildInput.name,
      };
  }

  async remove(
    guildId: string,
    channelId: string,
  ): Promise<GuildModuleVoiceGrowthChild> | null {
    const guildModuleVoiceGrowthChild: GuildModuleVoiceGrowthChild =
      await this.guildModuleVoiceGrowthChildRepository.findOne({
        where: { guildId: guildId, channelId: channelId },
      });
    if (guildModuleVoiceGrowthChild) {
      return this.guildModuleVoiceGrowthChildRepository.remove(
        guildModuleVoiceGrowthChild,
      );
    }
    return null;
  }
}
