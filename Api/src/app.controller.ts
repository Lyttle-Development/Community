import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('discord'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('discord'))
  @Get('auth/discord')
  async discordAuth(@Request() req) {
    return req.user;
  }

  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
