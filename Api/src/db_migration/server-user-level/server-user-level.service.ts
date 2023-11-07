import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerUserLevel } from './entities/server-user-level.entity';
import { MemberModuleLevel } from '../../db_primary/member-module-level/entities/member-module-level.entity';
import { MemberModuleLevelService } from '../../db_primary/member-module-level/member-module-level.service';
import { Member } from '../../db_primary/member/entities/member.entity';
import { MemberService } from '../../db_primary/member/member.service';
import { GuildService } from '../../db_primary/guild/guild.service';
import { CreateGuildInput } from '../../db_primary/guild/dto/create-guild.input';

@Injectable()
export class ServerUserLevelService {
  constructor(
    @InjectRepository(ServerUserLevel, 'migration')
    private serverUserLevelRepository: Repository<ServerUserLevel>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
    @Inject(forwardRef(() => MemberService))
    private memberService: MemberService,
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

      await this.guildService.create({
        guildId,
        enabled: true,
      } as CreateGuildInput);

      await this.memberService.createBulk(
        serverUserLevels.map((m) => {
          return {
            guildId: m.guildId,
            userId: m.userId,
          } as Member;
        }),
      );

      const res = await this.memberModuleLevelService.createBulk(
        serverUserLevels.map((serverUserLevel) => {
          return {
            guildId: serverUserLevel.guildId,
            userId: serverUserLevel.userId,
            points: serverUserLevel.points,
          } as MemberModuleLevel;
        }),
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
