import { DiscordOauthGuard } from './discord-oauth.guard';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuildStatModule } from '../guild-stat/guild-stat.module';

@Module({
  imports: [ConfigModule.forRoot(), forwardRef(() => GuildStatModule)],
  providers: [DiscordOauthGuard],
})
export class DiscordOauthModule {}
