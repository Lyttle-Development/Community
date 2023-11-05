import { Module } from '@nestjs/common';
import { ServerEasterEggService } from './server-easter-egg.service';
import { ServerEasterEggResolver } from './server-easter-egg.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerEasterEgg } from './entities/server-easter-egg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerEasterEgg], 'migration')],
  providers: [ServerEasterEggResolver, ServerEasterEggService],
  exports: [ServerEasterEggService],
})
export class ServerEasterEggModule {}
