import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleEasterEggService } from './guild-module-easter-egg.service';
import { GuildModuleEasterEggResolver } from './guild-module-easter-egg.resolver';
import { GuildModuleEasterEgg } from './entities/guild-module-easter-egg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleEasterEgg]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildModuleEasterEggResolver, GuildModuleEasterEggService],
  exports: [GuildModuleEasterEggService],
})
export class GuildModuleEasterEggModule {}
