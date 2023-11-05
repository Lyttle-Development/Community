import { Resolver } from '@nestjs/graphql';
import { ServerUserService } from './server-user.service';
import { ServerUser } from './entities/server-user.entity';

@Resolver(() => ServerUser)
export class ServerUserResolver {
  constructor(private readonly serverUserService: ServerUserService) {}
}
