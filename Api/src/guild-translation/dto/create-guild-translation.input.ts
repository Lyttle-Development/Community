import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildTranslationInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
