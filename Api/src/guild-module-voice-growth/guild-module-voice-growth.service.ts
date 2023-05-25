import { Injectable } from '@nestjs/common';
import { CreateGuildModuleVoiceGrowthInput } from './dto/create-guild-module-voice-growth.input';
import { UpdateGuildModuleVoiceGrowthInput } from './dto/update-guild-module-voice-growth.input';
import { GuildModuleVoiceGrowth } from './entities/guild-module-voice-growth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuildModuleVoiceGrowthService {
  constructor(
    @InjectRepository(GuildModuleVoiceGrowth)
    private guildModuleVoiceGrowthRepository: Repository<GuildModuleVoiceGrowth>,
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

  findOne(id: number): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthRepository.findOne({
      where: { guild_id: id },
    });
  }

  async update(
    id: number,
    updateGuildModuleVoiceGrowthInput: UpdateGuildModuleVoiceGrowthInput,
  ): Promise<GuildModuleVoiceGrowth> | null {
    const guildModuleVoiceGrowth: GuildModuleVoiceGrowth =
      await this.guildModuleVoiceGrowthRepository.findOne({
        where: { guild_id: id },
      });
    if (guildModuleVoiceGrowth) {
      return this.guildModuleVoiceGrowthRepository.save({
        ...guildModuleVoiceGrowth,
        ...updateGuildModuleVoiceGrowthInput,
      });
    }
    throw new Error('GuildModuleVoiceGrowth not found');
  }

  async remove(id: number): Promise<GuildModuleVoiceGrowth> | null {
    const guildModuleVoiceGrowth: GuildModuleVoiceGrowth =
      await this.guildModuleVoiceGrowthRepository.findOne({
        where: { guild_id: id },
      });
    if (guildModuleVoiceGrowth) {
      return this.guildModuleVoiceGrowthRepository.remove(
        guildModuleVoiceGrowth,
      );
    }
    throw new Error('GuildModuleVoiceGrowth not found');
  }
}
