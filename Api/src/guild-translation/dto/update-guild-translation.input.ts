import { CreateGuildTranslationInput } from './create-guild-translation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildTranslationInput extends PartialType(CreateGuildTranslationInput) {
  @Field(() => Int)
  id: number;
}
