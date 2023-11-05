import { Module } from '@nestjs/common';
import { ServerVoiceGrowthService } from './server-voice-growth.service';
import { ServerVoiceGrowthResolver } from './server-voice-growth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerVoiceGrowth } from './entities/server-voice-growth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerVoiceGrowth], 'migration')],
  providers: [ServerVoiceGrowthResolver, ServerVoiceGrowthService],
  exports: [ServerVoiceGrowthService],
})
export class ServerVoiceGrowthModule {}
