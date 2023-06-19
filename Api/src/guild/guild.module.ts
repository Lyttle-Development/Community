import { forwardRef, Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildResolver } from './guild.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { GuildModuleLevelModule } from '../guild-module-level/guild-module-level.module';
import { GuildModuleQotdModule } from '../guild-module-qotd/guild-module-qotd.module';
import { GuildMessageModule } from '../guild-message/guild-message.module';
import { GuildTranslationModule } from '../guild-translation/guild-translation.module';
import { MemberModule } from '../member/member.module';
import { GuildModuleVoiceGrowthModule } from '../guild-module-voice-growth/guild-module-voice-growth.module';
import { DiscordModule } from '../discord/discord.module';
import { GuildStatResolvedModule } from '../guild-stat-resolved/guild-stat-resolved.module';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { GuildModuleBirthdayModule } from '../guild-module-birthday/guild-module-birthday.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guild]),
    forwardRef(() => GuildModuleLevelModule),
    forwardRef(() => GuildModuleBirthdayModule),
    forwardRef(() => GuildModuleQotdModule),
    forwardRef(() => GuildMessageModule),
    forwardRef(() => GuildTranslationModule),
    forwardRef(() => MemberModule),
    forwardRef(() => GuildModuleVoiceGrowthModule),
    forwardRef(() => DiscordModule),
    forwardRef(() => GuildStatResolvedModule),
    forwardRef(() => OpenAiModule),
  ],
  providers: [GuildResolver, GuildService],
  exports: [GuildService],
})
export class GuildModule {}
