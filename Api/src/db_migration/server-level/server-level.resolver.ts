import { Resolver } from '@nestjs/graphql';
import { ServerLevelService } from './server-level.service';
import { ServerLevel } from './entities/server-level.entity';

@Resolver(() => ServerLevel)
export class ServerLevelResolver {
  constructor(private readonly serverLevelService: ServerLevelService) {}
}
