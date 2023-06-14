import { Resolver } from '@nestjs/graphql';
import { OpenaiService } from './openai.service';

@Resolver()
export class OpenaiResolver {
  constructor(private readonly openaiService: OpenaiService) {}
}
