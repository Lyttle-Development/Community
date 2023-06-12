import { Module } from '@nestjs/common';
import { GuildModuleCountToNumberService } from './guild-module-count-to-number.service';
import { GuildModuleCountToNumberResolver } from './guild-module-count-to-number.resolver';

@Module({
  providers: [
    GuildModuleCountToNumberResolver,
    GuildModuleCountToNumberService,
  ],
})
export class GuildModuleCountToNumberModule {}
