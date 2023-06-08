import { CreateGuildTranslationInput } from './create-guild-translation.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildTranslationInput extends PartialType(
  CreateGuildTranslationInput,
) {
  @Field(() => Int)
  guildId: string;

  @Field(() => Int)
  key: string;
}
