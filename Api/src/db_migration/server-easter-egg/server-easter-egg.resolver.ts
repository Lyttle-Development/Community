import { Resolver } from '@nestjs/graphql';
import { ServerEasterEggService } from './server-easter-egg.service';
import { ServerEasterEgg } from './entities/server-easter-egg.entity';

@Resolver(() => ServerEasterEgg)
export class ServerEasterEggResolver {
  constructor(
    private readonly serverEasterEggService: ServerEasterEggService,
  ) {}
}
