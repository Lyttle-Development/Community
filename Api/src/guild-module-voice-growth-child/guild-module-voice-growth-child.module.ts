import { Module } from '@nestjs/common';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';
import { GuildModuleVoiceGrowthChildResolver } from './guild-module-voice-growth-child.resolver';

@Module({
  providers: [
    GuildModuleVoiceGrowthChildResolver,
    GuildModuleVoiceGrowthChildService,
  ],
})
export class GuildModuleVoiceGrowthChildModule {}
