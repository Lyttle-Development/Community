import { Module } from '@nestjs/common';
import { MigrateService } from './migrate.service';
import { MigrateResolver } from './migrate.resolver';

@Module({
  // imports: [forwardRef(() => ServerUserLevelModule)],
  providers: [MigrateResolver, MigrateService],
  exports: [MigrateModule],
})
export class MigrateModule {}
