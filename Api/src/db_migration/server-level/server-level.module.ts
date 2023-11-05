import { Module } from '@nestjs/common';
import { ServerLevelService } from './server-level.service';
import { ServerLevelResolver } from './server-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerLevel } from './entities/server-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerLevel], 'migration')],
  providers: [ServerLevelResolver, ServerLevelService],
  exports: [ServerLevelService],
})
export class ServerLevelModule {}
