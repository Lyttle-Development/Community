import { CreateGuildModuleVoiceGrowthInput } from './create-guild-module-voice-growth.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleVoiceGrowthInput extends PartialType(
  CreateGuildModuleVoiceGrowthInput,
) {
  @Field(() => Int)
  guildId: string;
}
