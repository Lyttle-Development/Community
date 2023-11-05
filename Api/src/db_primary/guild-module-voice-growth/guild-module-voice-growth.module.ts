import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleVoiceGrowthService } from './guild-module-voice-growth.service';
import { GuildModuleVoiceGrowthResolver } from './guild-module-voice-growth.resolver';
import { GuildModuleVoiceGrowth } from './entities/guild-module-voice-growth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleVoiceGrowth]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildModuleVoiceGrowthResolver, GuildModuleVoiceGrowthService],
  exports: [GuildModuleVoiceGrowthService],
})
export class GuildModuleVoiceGrowthModule {}
