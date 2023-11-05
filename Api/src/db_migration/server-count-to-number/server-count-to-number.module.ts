import { Module } from '@nestjs/common';
import { ServerCountToNumberService } from './server-count-to-number.service';
import { ServerCountToNumberResolver } from './server-count-to-number.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerCountToNumber } from './entities/server-count-to-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerCountToNumber], 'migration')],
  providers: [ServerCountToNumberResolver, ServerCountToNumberService],
  exports: [ServerCountToNumberService],
})
export class ServerCountToNumberModule {}
