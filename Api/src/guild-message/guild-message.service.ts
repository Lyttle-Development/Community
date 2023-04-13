import { Injectable } from '@nestjs/common';
import type { CreateGuildMessageInput } from './dto/create-guild-message.input';
import type { UpdateGuildMessageInput } from './dto/update-guild-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildMessage } from './entities/guild-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildMessageService {
  constructor(
    @InjectRepository(GuildMessage)
    private guildMessageRepository: Repository<GuildMessage>,
  ) {}

  create(
    createGuildMessageInput: CreateGuildMessageInput,
  ): Promise<GuildMessage> {
    return this.guildMessageRepository.save(createGuildMessageInput);
  }

  findAll(): Promise<GuildMessage[]> {
    return this.guildMessageRepository.find();
  }

  findAllByGuild(id: number): Promise<GuildMessage[]> {
    return this.guildMessageRepository.find({
      where: { guild_id: id },
    });
  }

  findOne(id: number): Promise<GuildMessage> {
    return this.guildMessageRepository.findOne({
      where: { guild_id: id },
    });
  }

  findOneByGuildAndMessageId(
    guildId: number,
    messageId: number,
  ): Promise<GuildMessage> {
    return this.guildMessageRepository.findOne({
      where: { guild_id: guildId, message_id: messageId },
    });
  }

  async update(
    id: number,
    updateGuildMessageInput: UpdateGuildMessageInput,
  ): Promise<GuildMessage> | null {
    const guildMessage: GuildMessage =
      await this.guildMessageRepository.findOne({
        where: { guild_id: id },
      });

    if (guildMessage) {
      return this.guildMessageRepository.save({
        ...guildMessage,
        ...updateGuildMessageInput,
      });
    }
    throw new Error('GuildMessage not found');
  }

  async remove(id: number): Promise<GuildMessage> | null {
    const guildMessage: GuildMessage =
      await this.guildMessageRepository.findOne({
        where: { guild_id: id },
      });

    if (guildMessage) {
      return this.guildMessageRepository.remove(guildMessage);
    }
    throw new Error('GuildMessage not found');
  }
}
