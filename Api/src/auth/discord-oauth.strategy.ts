import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

@Injectable()
export class DiscordOauthStrategy extends PassportStrategy(
  Strategy,
  'discord',
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: 1091770488361058435,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    const { id, username, discriminator, avatar, guilds } = profile;
    return {
      discordId: id,
      username,
      discriminator,
      avatar,
      guilds,
    };
  }
}