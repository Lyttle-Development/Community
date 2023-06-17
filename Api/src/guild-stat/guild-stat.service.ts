import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildStat } from './entities/guild-stat.entity';

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
}
