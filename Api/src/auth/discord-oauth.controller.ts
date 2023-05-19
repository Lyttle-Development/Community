import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordOauthGuard } from './discord-oauth.guard';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth/discord')
export class DiscordOauthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(DiscordOauthGuard)
  async discordAuth(@Req() _req: Request) {
    return;
  }

  @Get('redirect')
  @UseGuards(DiscordOauthGuard)
  async discordAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return req.user;
  }
}