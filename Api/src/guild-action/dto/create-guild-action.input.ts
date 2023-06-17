import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildActionInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  values: string;

  @Field(() => Boolean)
  executed: boolean;

  @Field(() => String)
  guildId: string;
}
