import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildModuleVoiceGrowthInput } from './dto/create-guild-module-voice-growth.input';
import { UpdateGuildModuleVoiceGrowthInput } from './dto/update-guild-module-voice-growth.input';
import { GuildModuleVoiceGrowth } from './entities/guild-module-voice-growth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildModuleVoiceGrowthService {
  constructor(
    @InjectRepository(GuildModuleVoiceGrowth)
    private guildModuleVoiceGrowthRepository: Repository<GuildModuleVoiceGrowth>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createGuildModuleVoiceGrowthInput: CreateGuildModuleVoiceGrowthInput,
  ): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthRepository.save(
      createGuildModuleVoiceGrowthInput,
    );
  }

  findAll(): Promise<GuildModuleVoiceGrowth[]> {
    return this.guildModuleVoiceGrowthRepository.find();
  }

  findOne(id: string): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    guildId: string,
    channelId: string,
    updateGuildModuleVoiceGrowthInput: UpdateGuildModuleVoiceGrowthInput,
  ): Promise<GuildModuleVoiceGrowth> | null {
    const guildModuleVoiceGrowth: GuildModuleVoiceGrowth =
      await this.guildModuleVoiceGrowthRepository.findOne({
        where: { guildId, channelId },
      });
    if (guildModuleVoiceGrowth) {
      return this.guildModuleVoiceGrowthRepository.save({
        ...guildModuleVoiceGrowth,
        ...updateGuildModuleVoiceGrowthInput,
      });
    }
    // If the guildModuleVoiceGrowth doesn't exist, create it
    const guildModuleVoiceGrowthInput: CreateGuildModuleVoiceGrowthInput = {
      guildId,
      channelId,
      enabled: updateGuildModuleVoiceGrowthInput.enabled,
      preset: updateGuildModuleVoiceGrowthInput.preset,
      prefix: updateGuildModuleVoiceGrowthInput.prefix,
      manual: updateGuildModuleVoiceGrowthInput.manual,
    };
    return this.guildModuleVoiceGrowthRepository.save(
      guildModuleVoiceGrowthInput,
    );
  }

  async remove(id: string): Promise<GuildModuleVoiceGrowth> | null {
    const guildModuleVoiceGrowth: GuildModuleVoiceGrowth =
      await this.guildModuleVoiceGrowthRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleVoiceGrowth) {
      return this.guildModuleVoiceGrowthRepository.remove(
        guildModuleVoiceGrowth,
      );
    }
    throw new Error('GuildModuleVoiceGrowth not found');
  }
}
