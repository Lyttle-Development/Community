import { forwardRef, Module } from '@nestjs/common';
import { OpenAiService } from './openAi.service';
import { OpenAiResolver } from './openAi.resolver';
import { GuildStatResolvedModule } from '../guild-stat-resolved/guild-stat-resolved.module';
import { DiscordModule } from '../discord/discord.module';
import { GuildStatModule } from '../guild-stat/guild-stat.module';

@Module({
  imports: [
    forwardRef(() => GuildStatResolvedModule),
    forwardRef(() => GuildStatModule),
    forwardRef(() => DiscordModule),
  ],
  providers: [OpenAiResolver, OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
