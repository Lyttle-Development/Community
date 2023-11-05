import { Module } from '@nestjs/common';
import { GuildStatService } from './guild-stat.service';
import { GuildStatResolver } from './guild-stat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildStat } from './entities/guild-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuildStat])],
  providers: [GuildStatResolver, GuildStatService],
  exports: [GuildStatService],
})
export class GuildStatModule {}
