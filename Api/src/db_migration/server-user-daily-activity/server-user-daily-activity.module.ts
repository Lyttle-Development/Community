import { Module } from '@nestjs/common';
import { ServerUserDailyActivityService } from './server-user-daily-activity.service';
import { ServerUserDailyActivityResolver } from './server-user-daily-activity.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerUserDailyActivity } from './entities/server-user-daily-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerUserDailyActivity], 'migration')],
  providers: [ServerUserDailyActivityResolver, ServerUserDailyActivityService],
  exports: [ServerUserDailyActivityService],
})
export class ServerUserDailyActivityModule {}
