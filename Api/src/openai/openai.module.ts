import { forwardRef, Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiResolver } from './openai.resolver';
import { GuildStatResolvedModule } from '../guild-stat-resolved/guild-stat-resolved.module';
import { DiscordModule } from '../discord/discord.module';

@Module({
  imports: [
    forwardRef(() => GuildStatResolvedModule),
    forwardRef(() => DiscordModule),
  ],
  providers: [OpenaiResolver, OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
