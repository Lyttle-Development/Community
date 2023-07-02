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

  findAllByGuild(id: string): Promise<GuildTranslation[]> {
    return this.guildTranslationRepository.find({ where: { guildId: id } });
  }

  findOne(id: string, key: string): Promise<GuildTranslation> {
    return this.guildTranslationRepository.findOne({
      where: { guildId: id, key: key },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    updateGuildTranslationInput: UpdateGuildTranslationInput,
  ): Promise<GuildTranslation> {
    const guildTranslation: GuildTranslation =
      await this.guildTranslationRepository.findOne({
        where: {
          guildId: updateGuildTranslationInput.guildId,
          key: updateGuildTranslationInput.key,
        },
      });

    if (guildTranslation && !updateGuildTranslationInput.value) {
      await this.guildTranslationRepository.delete(guildTranslation);
      return guildTranslation;
    }

    if (guildTranslation) {
      guildTranslation.value = updateGuildTranslationInput.value;
      await this.guildTranslationRepository.save(guildTranslation);
      return guildTranslation;
    }

    // if guildTranslation is null, create a new one
    const newGuildTranslation: GuildTranslation =
      await this.guildTranslationRepository.create({
        guildId: updateGuildTranslationInput.guildId,
        key: updateGuildTranslationInput.key,
        value: updateGuildTranslationInput.value,
      });

    if (!updateGuildTranslationInput.value) return newGuildTranslation;
    return this.guildTranslationRepository.save(newGuildTranslation);
  }

  async remove(guildId: string, key: string): Promise<GuildTranslation> | null {
    const guildTranslation: GuildTranslation =
      await this.guildTranslationRepository.findOne({
        where: { guildId, key },
      });
    if (guildTranslation) {
      await this.guildTranslationRepository.delete(guildTranslation);
    }
    throw new Error('GuildTranslation not found');
  }
}
