import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Public } from './db_primary/auth/discord.guard';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([
      // Replace the pingCheck to a valid endpoint in your app
      () => this.http.pingCheck('application', 'http://localhost:3000/api/health'),
    ]);
  }
}
