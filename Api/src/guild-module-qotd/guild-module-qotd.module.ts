import { Module } from '@nestjs/common';
import { GuildModuleQotdService } from './guild-module-qotd.service';
import { GuildModuleQotdResolver } from './guild-module-qotd.resolver';

@Module({
  providers: [GuildModuleQotdResolver, GuildModuleQotdService]
})
export class GuildModuleQotdModule {}
