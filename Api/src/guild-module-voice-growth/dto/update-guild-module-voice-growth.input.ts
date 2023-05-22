import { CreateGuildModuleVoiceGrowthInput } from './create-guild-module-voice-growth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleVoiceGrowthInput extends PartialType(CreateGuildModuleVoiceGrowthInput) {
  @Field(() => Int)
  id: number;
}
