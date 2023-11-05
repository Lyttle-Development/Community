import { Injectable } from '@nestjs/common';
import { Migrate } from './entities/migrate.entity';

@Injectable()
export class MigrateService {
  constructor() {} // private migrateMemberModuleLevelService: MigrateMemberModuleLevelService, // @Inject(forwardRef(() => MigrateMemberModuleLevelService))

  async migrateGuild(guildId: string): Promise<Migrate> {
    console.log('migrateGuild');
    // await this.migrateMemberModuleLevelService.findAllFromGuildId(guildId);
    return { success: true, guildId: guildId, users: 0 };
  }
}
