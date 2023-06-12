import { CreateGuildModuleVoiceGrowthChildInput } from './create-guild-module-voice-growth-child.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleVoiceGrowthChildInput extends PartialType(
  CreateGuildModuleVoiceGrowthChildInput,
) {
  @Field(() => Int)
  id: number;
}
