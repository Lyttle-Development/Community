import { Module } from '@nestjs/common';
import { ServerUserLevelService } from './server-user-level.service';
import { ServerUserLevelResolver } from './server-user-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerUserLevel } from './entities/server-user-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerUserLevel], 'migration')],
  providers: [ServerUserLevelResolver, ServerUserLevelService],
  exports: [ServerUserLevelService],
})
export class ServerUserLevelModule {}
