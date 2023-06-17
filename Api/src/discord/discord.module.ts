import { forwardRef, Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordResolver } from './discord.resolver';
import { GuildStatResolvedModule } from '../guild-stat-resolved/guild-stat-resolved.module';
import { GuildModule } from '../guild/guild.module';
import { GuildModuleLevelModule } from '../guild-module-level/guild-module-level.module';

@Module({
  imports: [
    forwardRef(() => GuildModule),
    forwardRef(() => GuildStatResolvedModule),
    forwardRef(() => GuildModuleLevelModule),
  ],
  providers: [DiscordResolver, DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
