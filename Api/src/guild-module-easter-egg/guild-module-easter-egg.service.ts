import { Inject, Injectable } from '@nestjs/common';
import { CreateGuildModuleEasterEggInput } from './dto/create-guild-module-easter-egg.input';
import { UpdateGuildModuleEasterEggInput } from './dto/update-guild-module-easter-egg.input';
import { GuildModuleEasterEgg } from './entities/guild-module-easter-egg.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildModuleEasterEggService {
  constructor(
    @InjectRepository(GuildModuleEasterEgg)
    private guildModuleEasterEggRepository: Repository<GuildModuleEasterEgg>,
    @Inject(GuildService)
    private guildService: GuildService,
  ) {}

  async create(
    createGuildModuleEasterEggInput: CreateGuildModuleEasterEggInput,
  ): Promise<GuildModuleEasterEgg> {
    const guild = await this.guildService.findOne(
      createGuildModuleEasterEggInput.guildId,
    );
    if (!guild) {
      return null;
    }
    return this.guildModuleEasterEggRepository.save({
      ...createGuildModuleEasterEggInput,
      guild,
    });
  }

  findAll(): Promise<GuildModuleEasterEgg[]> {
    return this.guildModuleEasterEggRepository.find();
  }

  findOne(id: string): Promise<GuildModuleEasterEgg> {
    return this.guildModuleEasterEggRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: string,
    updateGuildModuleEasterEggInput: UpdateGuildModuleEasterEggInput,
  ): Promise<GuildModuleEasterEgg> {
    const guildModuleEasterEgg: GuildModuleEasterEgg =
      await this.guildModuleEasterEggRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleEasterEgg) {
      return this.guildModuleEasterEggRepository.save({
        ...guildModuleEasterEgg,
        ...updateGuildModuleEasterEggInput,
      });
    }
    // If the guildModuleEasterEgg doesn't exist, create it
    const guildModuleEasterEggInput: CreateGuildModuleEasterEggInput = {
      guildId: id,
      enabled: updateGuildModuleEasterEggInput.enabled,
    };
    return this.guildModuleEasterEggRepository.create(
      guildModuleEasterEggInput,
    );
  }

  async remove(id: string): Promise<GuildModuleEasterEgg | null> {
    const guildModuleEasterEgg: GuildModuleEasterEgg =
      await this.guildModuleEasterEggRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleEasterEgg) {
      return this.guildModuleEasterEggRepository.remove(guildModuleEasterEgg);
    }
    return null;
  }
}
