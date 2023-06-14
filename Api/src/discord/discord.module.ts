import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordResolver } from './discord.resolver';

@Module({
  providers: [DiscordResolver, DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
