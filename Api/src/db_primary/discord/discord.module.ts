import { forwardRef, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DiscordService } from './discord.service';
import { DiscordResolver } from './discord.resolver';
import { GuildStatResolvedModule } from '../guild-stat-resolved/guild-stat-resolved.module';
import { GuildModule } from '../guild/guild.module';
import { GuildModuleLevelModule } from '../guild-module-level/guild-module-level.module';

@Module({
  imports: [
    CacheModule.register(),
    forwardRef(() => GuildModule),
    forwardRef(() => GuildStatResolvedModule),
    forwardRef(() => GuildModuleLevelModule),
  ],
  providers: [DiscordResolver, DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
