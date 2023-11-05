import { Resolver } from '@nestjs/graphql';
import { ServerVoiceGrowthService } from './server-voice-growth.service';
import { ServerVoiceGrowth } from './entities/server-voice-growth.entity';

@Resolver(() => ServerVoiceGrowth)
export class ServerVoiceGrowthResolver {
  constructor(
    private readonly serverVoiceGrowthService: ServerVoiceGrowthService,
  ) {}
}
