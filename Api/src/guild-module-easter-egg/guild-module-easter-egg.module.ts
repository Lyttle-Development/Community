import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleEasterEggService } from './guild-module-easter-egg.service';
import { GuildModuleEasterEggResolver } from './guild-module-easter-egg.resolver';
import { Guild } from '../guild/entities/guild.entity';
import { GuildModuleEasterEgg } from './entities/guild-module-easter-egg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleEasterEgg]),
    forwardRef(() => Guild),
  ],
  providers: [GuildModuleEasterEggResolver, GuildModuleEasterEggService],
  exports: [GuildModuleEasterEggService],
})
export class GuildModuleEasterEggModule {}
