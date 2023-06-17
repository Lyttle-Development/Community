import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildModuleBirthdayInput } from './dto/create-guild-module-birthday.input';
import { UpdateGuildModuleBirthdayInput } from './dto/update-guild-module-birthday.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildModuleBirthday } from './entities/guild-module-birthday.entity';
import { Repository } from 'typeorm';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildModuleBirthdayService {
  constructor(
    @InjectRepository(GuildModuleBirthday)
    private guildModuleBirthdayRepository: Repository<GuildModuleBirthday>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  async create(
    createGuildModuleBirthdayInput: CreateGuildModuleBirthdayInput,
  ): Promise<GuildModuleBirthday> | null {
    const guild: Guild = await this.guildService.findOne(
      createGuildModuleBirthdayInput.guildId,
    );
    if (!guild) {
      return null;
    }
    return this.guildModuleBirthdayRepository.save({
      ...createGuildModuleBirthdayInput,
      guild,
    });
  }

  findAll(): Promise<GuildModuleBirthday[]> {
    return this.guildModuleBirthdayRepository.find();
  }

  findOne(id: string): Promise<GuildModuleBirthday> {
    return this.guildModuleBirthdayRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: string,
    updateGuildModuleBirthdayInput: UpdateGuildModuleBirthdayInput,
  ): Promise<GuildModuleBirthday> | null {
    const guildModuleBirthday: GuildModuleBirthday =
      await this.guildModuleBirthdayRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleBirthday) {
      return this.guildModuleBirthdayRepository.save({
        ...guildModuleBirthday,
        ...updateGuildModuleBirthdayInput,
      });
    }
    return null;
  }

  async remove(id: string): Promise<GuildModuleBirthday> | null {
    const guildModuleBirthday: GuildModuleBirthday =
      await this.guildModuleBirthdayRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleBirthday) {
      return this.guildModuleBirthdayRepository.remove(guildModuleBirthday);
    }
    return null;
  }
}
