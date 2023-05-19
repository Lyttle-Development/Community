import { DiscordOauthGuard } from './discord-oauth.guard';
import { DiscordOauthController } from './discord-oauth.controller';
import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  controllers: [DiscordOauthController],
  providers: [DiscordOauthGuard],
})
export class DiscordOauthModule {}