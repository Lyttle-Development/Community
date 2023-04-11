import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  tokens: number;
}
