import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildModuleCountToNumberInput } from './dto/create-guild-module-count-to-number.input';
import { UpdateGuildModuleCountToNumberInput } from './dto/update-guild-module-count-to-number.input';
import { GuildModuleCountToNumber } from './entities/guild-module-count-to-number.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildService } from '../guild/guild.service';
import { Repository } from 'typeorm';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildModuleCountToNumberService {
  constructor(
    @InjectRepository(GuildModuleCountToNumber)
    private guildModuleCountToNumberRepository: Repository<GuildModuleCountToNumber>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  async create(
    createGuildModuleCountToNumberInput: CreateGuildModuleCountToNumberInput,
  ) {
    const guild: Guild = await this.guildService.findOne(
      createGuildModuleCountToNumberInput.guildId,
    );
    if (!guild) {
      return null;
    }
    return this.guildModuleCountToNumberRepository.save({
      ...createGuildModuleCountToNumberInput,
      guild,
    });
  }

  findAll(): Promise<GuildModuleCountToNumber[]> {
    return this.guildModuleCountToNumberRepository.find();
  }

  findOne(id: string): Promise<GuildModuleCountToNumber> {
    return this.guildModuleCountToNumberRepository.findOne({
      where: { guildId: id },
    });
  }

  async update(
    id: string,
    updateGuildModuleCountToNumberInput: UpdateGuildModuleCountToNumberInput,
  ): Promise<GuildModuleCountToNumber> | null {
    const guildModuleCountToNumber: GuildModuleCountToNumber =
      await this.guildModuleCountToNumberRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleCountToNumber) {
      return this.guildModuleCountToNumberRepository.save({
        ...guildModuleCountToNumber,
        ...updateGuildModuleCountToNumberInput,
      });
    }
    // If the guildModuleCountT0Number doesn't exist, create it
    const guildModuleCountToNumberInput: CreateGuildModuleCountToNumberInput = {
      guildId: id,
      channelId: updateGuildModuleCountToNumberInput.channelId,
      enabled: updateGuildModuleCountToNumberInput.enabled,
    };
    return this.guildModuleCountToNumberRepository.create(
      guildModuleCountToNumberInput,
    );
  }

  async remove(id: string): Promise<GuildModuleCountToNumber> | null {
    const guildModuleCountToNumber: GuildModuleCountToNumber =
      await this.guildModuleCountToNumberRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleCountToNumber) {
      return this.guildModuleCountToNumberRepository.remove(
        guildModuleCountToNumber,
      );
    }
    return null;
  }
}
