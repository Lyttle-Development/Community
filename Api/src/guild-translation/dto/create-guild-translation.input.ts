import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildTranslationInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
