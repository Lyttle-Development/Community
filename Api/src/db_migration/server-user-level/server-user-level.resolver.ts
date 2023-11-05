import { Resolver } from '@nestjs/graphql';
import { ServerUserLevelService } from './server-user-level.service';
import { ServerUserLevel } from './entities/server-user-level.entity';

@Resolver(() => ServerUserLevel)
export class ServerUserLevelResolver {
  constructor(
    private readonly serverUserLevelService: ServerUserLevelService,
  ) {}
}
