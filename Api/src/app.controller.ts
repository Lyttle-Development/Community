import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  @Get('auth/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    const user = req.user as unknown as DiscordValidateResponse;

    res.cookie('accessToken', user.accessToken);
    res.cookie('refreshToken', user.refreshToken);

    return res.redirect(process.env.CLIENT_DASHBOARD_URI);
  }

  @Public()
  @Get('auth/login')
  @UseGuards(AuthGuard('discord'))
  async getLogin(@Res() res: Response) {
    return res.status(200).send('Redirecting...');
  }

  @Public()
  @Get('auth/logout')
  @UseGuards()
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.redirect(process.env.CLIENT_URI);
  }

  @Post('auth/login')
  async postLogin(@Request() req) {
    return req.user;
  }
}
