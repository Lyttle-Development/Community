import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OpenAiService } from './open-ai.service';
import { OpenAi } from './entities/open-ai.entity';

@Resolver(() => OpenAi)
export class OpenAiResolver {
  constructor(private readonly openaiService: OpenAiService) {}

  @ResolveField(() => String)
  recommendation(@Parent() openAi: OpenAi): Promise<string> {
    return this.openaiService.getOrCreateRecommendation(openAi.guildId);
  }
}
