import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildMessageInput } from './dto/create-guild-message.input';
import type { UpdateGuildMessageInput } from './dto/update-guild-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildMessage } from './entities/guild-message.entity';
import { Repository } from 'typeorm';
import { Guild } from '../guild/entities/guild.entity';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class GuildMessageService {
  constructor(
    @InjectRepository(GuildMessage)
    private guildMessageRepository: Repository<GuildMessage>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  create(
    createGuildMessageInput: CreateGuildMessageInput,
  ): Promise<GuildMessage> {
    return this.guildMessageRepository.save(createGuildMessageInput);
  }

  findAll(): Promise<GuildMessage[]> {
    return this.guildMessageRepository.find();
  }

  findAllByGuild(guildId: string): Promise<GuildMessage[]> {
    return this.guildMessageRepository.find({
      where: { guild: { guildId } },
    });
  }

  findOne(id: string): Promise<GuildMessage> {
    return this.guildMessageRepository.findOne({
      where: { id },
    });
  }

  getGuild(id: string): Promise<Guild> {
    return this.guildService.findOne(id);
  }

  async update(
    id: string,
    updateGuildMessageInput: UpdateGuildMessageInput,
  ): Promise<GuildMessage> | null {
    const guildMessage: GuildMessage =
      await this.guildMessageRepository.findOne({
        where: { id },
      });

    if (guildMessage) {
      return this.guildMessageRepository.save({
        ...guildMessage,
        ...updateGuildMessageInput,
      });
    }
    throw new Error('GuildMessage not found');
  }

  async remove(id: string): Promise<GuildMessage> | null {
    const guildMessage: GuildMessage =
      await this.guildMessageRepository.findOne({
        where: { id },
      });

    if (guildMessage) {
      return this.guildMessageRepository.remove(guildMessage);
    }
    throw new Error('GuildMessage not found');
  }
}
