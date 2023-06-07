import { DiscordOauthGuard } from './discord-oauth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DiscordOauthGuard],
})
export class DiscordOauthModule {}