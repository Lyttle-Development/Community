import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';

export interface DiscordValidateResponse {
  accessToken: string;
  refreshToken: string;
  profile: any;
}

@Injectable()
export class DiscordOauthStrategy extends PassportStrategy(
  Strategy,
  'discord',
) {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    delete profile.accessToken;
    return {
      accessToken: _accessToken,
      refreshToken: _refreshToken,
      profile,
    };
  }
}