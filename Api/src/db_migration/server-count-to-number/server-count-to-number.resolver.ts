import { Resolver } from '@nestjs/graphql';
import { ServerCountToNumberService } from './server-count-to-number.service';
import { ServerCountToNumber } from './entities/server-count-to-number.entity';

@Resolver(() => ServerCountToNumber)
export class ServerCountToNumberResolver {
  constructor(
    private readonly serverCountToNumberService: ServerCountToNumberService,
  ) {}
}
