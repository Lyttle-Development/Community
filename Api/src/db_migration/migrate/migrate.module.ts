import { forwardRef, Module } from '@nestjs/common';
import { MigrateService } from './migrate.service';
import { MigrateResolver } from './migrate.resolver';
import { ServerUserLevelModule } from '../server-user-level/server-user-level.module';

@Module({
  imports: [forwardRef(() => ServerUserLevelModule)],
  providers: [MigrateResolver, MigrateService],
  exports: [MigrateModule],
})
export class MigrateModule {}
