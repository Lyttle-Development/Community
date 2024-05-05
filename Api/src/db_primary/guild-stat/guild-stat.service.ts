import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildStat } from './entities/guild-stat.entity';
import { BOT_FAKE_GUILD_ID } from '@lyttledev/client/dist/Client/constants';

@Injectable()
export class GuildStatService {
  constructor(
    @InjectRepository(GuildStat)
    private guildStatRepository: Repository<GuildStat>,
  ) {}

  async findOne(guildId: string, key: string, day: number): Promise<GuildStat> {
    return this.guildStatRepository.findOne({
      where: {
        guildId,
        key,
        day,
      },
    });
  }

  async createOrUpdate(
    guildId: string,
    key: string,
    day: number,
    value: string,
  ): Promise<GuildStat> {
    const guildStat = await this.findOne(guildId, key, day);

    if (guildStat) {
      guildStat.value = value;
      return this.guildStatRepository.save(guildStat);
    }

    return this.guildStatRepository.save({
      guildId,
      key,
      day,
      value,
    });
  }

  async findAllByGroup(
    guildId: string,
    groupKey: string,
  ): Promise<GuildStat[]> {
    return this.guildStatRepository.find({
      where: {
        guildId,
        groupKey,
      },
    });
  }

  async getGeneralStats(): Promise<GuildStat> {
    return await this.findOne(BOT_FAKE_GUILD_ID, 'stats', -1);
  }
}
