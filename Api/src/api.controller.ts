import { Controller, Get } from '@nestjs/common';
import { Public } from './db_primary/auth/discord.guard';

@Controller('api')
export class ApiController {
  @Get('health')
  @Public()
  getStatus() {
    return { status: 'ok' };
  }
}
