import { Module } from '@nestjs/common';
import { GuildModuleEasterEggService } from './guild-module-easter-egg.service';
import { GuildModuleEasterEggResolver } from './guild-module-easter-egg.resolver';

@Module({
  providers: [GuildModuleEasterEggResolver, GuildModuleEasterEggService],
})
export class GuildModuleEasterEggModule {}
