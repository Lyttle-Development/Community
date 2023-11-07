import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Migrate } from './entities/migrate.entity';
import { ServerUserLevelService } from '../server-user-level/server-user-level.service';

@Injectable()
export class MigrateService {
  constructor(
    @Inject(forwardRef(() => ServerUserLevelService))
    private serverUserLevelService: ServerUserLevelService,
  ) {}

  async migrateGuild(guildId: string): Promise<Migrate> {
    const errors = [];
    let success = true;
    let users = 0;
    try {
      // Migrate points
      const [migratePointsSuccess, migratedUsers] =
        await this.serverUserLevelService.migratePoints(guildId);
      if (!migratePointsSuccess) success = false;
      users = migratedUsers;
    } catch (e) {
      errors.push(e);
      console.log('Error while migrating:', guildId + '\nError:', e);
      success = false;
    }
    return { success, guildId: guildId, users, errors };
  }
}
