import { Resolver } from '@nestjs/graphql';
import { ServerService } from './server.service';
import { Server } from './entities/server.entity';

@Resolver(() => Server)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}
}
