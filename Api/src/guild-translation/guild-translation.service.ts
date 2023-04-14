import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildTranslationInput } from './dto/create-guild-translation.input';
import type { UpdateGuildTranslationInput } from './dto/update-guild-translation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildTranslation } from './entities/guild-translation.entity';
import { Repository } from 'typeorm';
import { Guild } from '../guild/entities/guild.entity';
import { GuildService } from 'guild/guild.service';

@Injectable()
export class GuildTranslationService {
  constructor(
    @InjectRepository(GuildTranslation)
    private guildTranslationRepository: Repository<GuildTranslation>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createGuildTranslationInput: CreateGuildTranslationInput,
  ): Promise<GuildTranslation> {
    return this.guildTranslationRepository.save(createGuildTranslationInput);
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

  getGuild(id: number): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    updateGuildTranslationInput: UpdateGuildTranslationInput,
  ): Promise<GuildTranslation> {
    const guildTranslation: GuildTranslation =
      await this.guildTranslationRepository.findOne({
        where: { guild_id: updateGuildTranslationInput.id },
      });
    if (guildTranslation) {
      guildTranslation.key = updateGuildTranslationInput.key;
      guildTranslation.value = updateGuildTranslationInput.value;
      await this.guildTranslationRepository.save(guildTranslation);
      return guildTranslation;
    }
    throw new Error('GuildTranslation not found');
  }

  async remove(id: number): Promise<GuildTranslation> | null {
    const guildTranslation: GuildTranslation =
      await this.guildTranslationRepository.findOne({
        where: { guild_id: id },
      });
    if (guildTranslation) {
      await this.guildTranslationRepository.delete(guildTranslation);
    }
    throw new Error('GuildTranslation not found');
  }
}
