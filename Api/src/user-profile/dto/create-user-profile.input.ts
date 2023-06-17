import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field(() => Int)
  user_id: string;

  @Field(() => Int)
  tokens: number;

  @Field(() => Int)
  tokens_used: number;
}
