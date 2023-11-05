import { Resolver } from '@nestjs/graphql';
import { ServerEventService } from './server-event.service';
import { ServerEvent } from './entities/server-event.entity';

@Resolver(() => ServerEvent)
export class ServerEventResolver {
  constructor(private readonly serverEventService: ServerEventService) {}
}
