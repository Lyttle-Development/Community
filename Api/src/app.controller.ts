import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest, Response } from 'express';
import { DiscordValidateResponse } from './db_primary/auth/discord-oauth.strategy';
import { Public } from './db_primary/auth/discord.guard';
import * as process from 'process';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response) {
    return res.status(200).json({
      statusCode: 200,
      message: 'You are authorized to access this resource',
    });
  }

  @Public()
  @Get('auth/login')
  // @UseGuards(AuthGuard('discord'))
  async getLogin(@Req() req: ExpressRequest, @Res() res: Response) {
    const redirect = req.query.redirect || '';
    res.cookie('redirect', redirect);

    return res.redirect('/auth/discord');
  }

  @Public()
  @Get('auth/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    const user = req.user as unknown as DiscordValidateResponse;

    const redirectUrl = req.cookies.redirect
      ? `${process.env.CLIENT_URI}/${req.cookies.redirect}`
      : process.env.CLIENT_DASHBOARD_URI;

    res.cookie('accessToken', user.accessToken);
    res.cookie('refreshToken', user.refreshToken);
    res.cookie('redirect', '');

    return res.redirect(redirectUrl);
  }

  @Public()
  @Get('auth/logout')
  @UseGuards()
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.redirect(process.env.CLIENT_URI);
  }
}
