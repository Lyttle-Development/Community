import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildActionInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  values: string;

  @Field(() => Boolean)
  executed: boolean;

  @Field(() => Int)
  guildId: string;
}
