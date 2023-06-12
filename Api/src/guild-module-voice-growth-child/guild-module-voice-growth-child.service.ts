import { Injectable } from '@nestjs/common';
import { CreateGuildModuleVoiceGrowthChildInput } from './dto/create-guild-module-voice-growth-child.input';
import { UpdateGuildModuleVoiceGrowthChildInput } from './dto/update-guild-module-voice-growth-child.input';

@Injectable()
export class GuildModuleVoiceGrowthChildService {
  create(createGuildModuleVoiceGrowthChildInput: CreateGuildModuleVoiceGrowthChildInput) {
    return 'This action adds a new guildModuleVoiceGrowthChild';
  }

  findAll() {
    return `This action returns all guildModuleVoiceGrowthChild`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildModuleVoiceGrowthChild`;
  }

  update(id: number, updateGuildModuleVoiceGrowthChildInput: UpdateGuildModuleVoiceGrowthChildInput) {
    return `This action updates a #${id} guildModuleVoiceGrowthChild`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildModuleVoiceGrowthChild`;
  }
}
