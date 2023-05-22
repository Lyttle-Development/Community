import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  tokens: number;

  @Field(() => Int)
  tokens_used: number;
}
