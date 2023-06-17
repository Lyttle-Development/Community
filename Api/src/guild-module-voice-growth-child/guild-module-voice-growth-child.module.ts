import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';
import { GuildModuleVoiceGrowthChildResolver } from './guild-module-voice-growth-child.resolver';
import { GuildModuleVoiceGrowthChild } from './entities/guild-module-voice-growth-child.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModuleVoiceGrowthModule } from '../guild-module-voice-growth/guild-module-voice-growth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleVoiceGrowthChild]),
    forwardRef(() => GuildModuleVoiceGrowthModule),
  ],
  providers: [
    GuildModuleVoiceGrowthChildResolver,
    GuildModuleVoiceGrowthChildService,
  ],
  exports: [GuildModuleVoiceGrowthChildService],
})
export class GuildModuleVoiceGrowthChildModule {}
