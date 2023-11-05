import { Resolver } from '@nestjs/graphql';
import { ServerUserDailyActivityService } from './server-user-daily-activity.service';
import { ServerUserDailyActivity } from './entities/server-user-daily-activity.entity';

@Resolver(() => ServerUserDailyActivity)
export class ServerUserDailyActivityResolver {
  constructor(
    private readonly serverUserDailyActivityService: ServerUserDailyActivityService,
  ) {}
}
