import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest, Response } from 'express';
import { DiscordValidateResponse } from './auth/discord-oauth.strategy';
import { Public } from './auth/discord.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('auth/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    const user = req.user as unknown as DiscordValidateResponse;

    res.cookie('accessToken', user.accessToken);
    res.cookie('refreshToken', user.refreshToken);

    return res.redirect('/');
  }

  @Public()
  @Get('auth/login')
  @UseGuards(AuthGuard('discord'))
  async getLogin(@Res() res: Response) {
    return res.status(200).send('Redirecting...');
  }

  @Post('auth/login')
  async postLogin(@Request() req) {
    return req.user;
  }
}
