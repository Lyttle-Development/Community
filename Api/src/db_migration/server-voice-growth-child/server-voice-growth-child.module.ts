import { Module } from '@nestjs/common';
import { ServerVoiceGrowthChildService } from './server-voice-growth-child.service';
import { ServerVoiceGrowthChildResolver } from './server-voice-growth-child.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerVoiceGrowthChild } from './entities/server-voice-growth-child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerVoiceGrowthChild], 'migration')],
  providers: [ServerVoiceGrowthChildResolver, ServerVoiceGrowthChildService],
  exports: [ServerVoiceGrowthChildService],
})
export class ServerVoiceGrowthChildModule {}
