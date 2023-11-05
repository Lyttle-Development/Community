import { Module } from '@nestjs/common';
import { ServerEventService } from './server-event.service';
import { ServerEventResolver } from './server-event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerEvent } from './entities/server-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerEvent], 'migration')],
  providers: [ServerEventResolver, ServerEventService],
  exports: [ServerEventService],
})
export class ServerEventModule {}
