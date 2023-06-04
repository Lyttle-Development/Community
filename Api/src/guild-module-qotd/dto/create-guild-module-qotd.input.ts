import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleQotdInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  channel_id: number;

  @Field(() => Int)
  message_id: number;

  @Field(() => Boolean)
  nicknames: boolean;
}
