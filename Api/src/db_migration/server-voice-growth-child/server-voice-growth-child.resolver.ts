import { Resolver } from '@nestjs/graphql';
import { ServerVoiceGrowthChildService } from './server-voice-growth-child.service';
import { ServerVoiceGrowthChild } from './entities/server-voice-growth-child.entity';

@Resolver(() => ServerVoiceGrowthChild)
export class ServerVoiceGrowthChildResolver {
  constructor(
    private readonly serverVoiceGrowthChildService: ServerVoiceGrowthChildService,
  ) {}
}
