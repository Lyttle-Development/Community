import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerUserLevel } from './entities/server-user-level.entity';

@Injectable()
export class ServerUserLevelService {
  constructor(
    @InjectRepository(ServerUserLevel, 'migration')
    private serverUserLevelRepository: Repository<ServerUserLevel>,
  ) {}

  async findAllServerUserLevelsByGuildId(
    guildId: string,
  ): Promise<ServerUserLevel[]> {
    console.log('ServerUserLevelService: findAllServerUserLevelsByGuildId');
    console.log('guildId: ' + guildId);
    const serverUserLevels = await this.serverUserLevelRepository.find({
      where: {
        guildId: guildId,
      },
    });
    console.log('serverUserLevels: ' + serverUserLevels);
    return serverUserLevels;
  }
}
