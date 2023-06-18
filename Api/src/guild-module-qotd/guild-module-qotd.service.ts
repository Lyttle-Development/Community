import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildModuleQotdInput } from './dto/create-guild-module-qotd.input';
import type { UpdateGuildModuleQotdInput } from './dto/update-guild-module-qotd.input';
import { GuildModuleQotd } from './entities/guild-module-qotd.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildModuleQotdService {
  constructor(
    @InjectRepository(GuildModuleQotd)
    private guildModuleQotdRepository: Repository<GuildModuleQotd>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createGuildModuleQotdInput: CreateGuildModuleQotdInput,
  ): Promise<GuildModuleQotd> {
    return this.guildModuleQotdRepository.save(createGuildModuleQotdInput);
  }

  findAll(): Promise<GuildModuleQotd[]> {
    return this.guildModuleQotdRepository.find();
  }

  findOne(id: string): Promise<GuildModuleQotd> {
    return this.guildModuleQotdRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: string,
    updateGuildModuleQotdInput: UpdateGuildModuleQotdInput,
  ): Promise<GuildModuleQotd> | null {
    const guildModuleQotd: GuildModuleQotd =
      await this.guildModuleQotdRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleQotd) {
      return this.guildModuleQotdRepository.save({
        ...guildModuleQotd,
        ...updateGuildModuleQotdInput,
      });
    }
    // If the guildModuleQotd doesn't exist, create it
    const guildModuleQotdInput: CreateGuildModuleQotdInput = {
      channelId: id,
      enabled: updateGuildModuleQotdInput.enabled,
      messageId: updateGuildModuleQotdInput.messageId,
      nicknames: updateGuildModuleQotdInput.nicknames,
    };
  }

  async remove(id: string): Promise<GuildModuleQotd> | null {
    const guildModuleQotd: GuildModuleQotd =
      await this.guildModuleQotdRepository.findOne({
        where: { guildId: id },
      });
    if (guildModuleQotd) {
      return this.guildModuleQotdRepository.remove(guildModuleQotd);
    }
    throw new Error('GuildModuleQotd not found');
  }
}
