import { Injectable } from '@nestjs/common';
import { CreateGuildTranslationInput } from './dto/create-guild-translation.input';
import { UpdateGuildTranslationInput } from './dto/update-guild-translation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildTranslation } from './entities/guild-translation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildTranslationService {
  constructor(
    @InjectRepository(GuildTranslation)
    private guildTranslationRepository: Repository<GuildTranslation>,
  ) {}

  create(createGuildTranslationInput: CreateGuildTranslationInput) {
    return 'This action adds a new guildTranslation';
  }

  findAll(): Promise<GuildTranslation[]> {
    return this.guildTranslationRepository.find();
  }

  findAllByGuild(id: number): Promise<GuildTranslation[]> {
    return this.guildTranslationRepository.find({ where: { guild_id: id } });
  }

  findOne(id: number, key: string): Promise<GuildTranslation> {
    return this.guildTranslationRepository.findOne({
      where: { guild_id: id, key: key },
    });
  }

  update(id: number, updateGuildTranslationInput: UpdateGuildTranslationInput) {
    return `This action updates a #${id} guildTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildTranslation`;
  }
}
