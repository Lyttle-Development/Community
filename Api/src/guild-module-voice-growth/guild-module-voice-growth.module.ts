import { Module } from '@nestjs/common';
import { GuildModuleVoiceGrowthService } from './guild-module-voice-growth.service';
import { GuildModuleVoiceGrowthResolver } from './guild-module-voice-growth.resolver';

@Module({
  providers: [GuildModuleVoiceGrowthResolver, GuildModuleVoiceGrowthService]
})
export class GuildModuleVoiceGrowthModule {}
