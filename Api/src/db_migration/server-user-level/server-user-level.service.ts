import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerUserLevel } from './entities/server-user-level.entity';
import { MemberModuleLevel } from '../../db_primary/member-module-level/entities/member-module-level.entity';
import { MemberModuleLevelService } from '../../db_primary/member-module-level/member-module-level.service';

@Injectable()
export class ServerUserLevelService {
  constructor(
    @InjectRepository(ServerUserLevel, 'migration')
    private serverUserLevelRepository: Repository<ServerUserLevel>,
    @Inject(forwardRef(() => MemberModuleLevelService))
    private memberModuleLevelService: MemberModuleLevelService,
  ) {}

  async findAllByGuildId(guildId: string): Promise<ServerUserLevel[]> {
    return this.serverUserLevelRepository.find({
      where: {
        guildId: guildId,
      },
    });
  }

  async migratePoints(guildId: string): Promise<[boolean, number]> {
    let success = true;
    let migratedUsers = 0;
    try {
      const serverUserLevels: ServerUserLevel[] = await this.findAllByGuildId(
        guildId,
      );
      const migrationMembers: MemberModuleLevel[] = serverUserLevels.map(
        (serverUserLevel) => {
          return {
            guildId: serverUserLevel.guildId,
            userId: serverUserLevel.userId,
            points: serverUserLevel.points,
          } as MemberModuleLevel;
        },
      );

      const res = await this.memberModuleLevelService.createBulk(
        migrationMembers,
      );
      console.log(res);
      migratedUsers = res.length;
    } catch (e) {
      console.log('Error while migrating points:', guildId + '\nError:', e);
      success = false;
    }
    return [success, migratedUsers];
  }
}
