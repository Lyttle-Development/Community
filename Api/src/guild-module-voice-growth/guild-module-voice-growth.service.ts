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

  create(createGuildModuleVoiceGrowthInput: CreateGuildModuleVoiceGrowthInput) {
    return 'This action adds a new guildModuleVoiceGrowth';
  }

  findAll(): Promise<GuildModuleVoiceGrowth[]> {
    return this.guildModuleVoiceGrowthRepository.find();
  }

  findOne(id: number): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthRepository.findOne({
      where: { guild_id: id },
    });
  }

  update(
    id: number,
    updateGuildModuleVoiceGrowthInput: UpdateGuildModuleVoiceGrowthInput,
  ) {
    return `This action updates a #${id} guildModuleVoiceGrowth`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleVoiceGrowth`;
  }
}
