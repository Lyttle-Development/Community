import { Module } from '@nestjs/common';
import { GuildModuleLevelService } from './guild-module-level.service';
import { GuildModuleLevelResolver } from './guild-module-level.resolver';

@Module({
  providers: [GuildModuleLevelResolver, GuildModuleLevelService]
})
export class GuildModuleLevelModule {}
