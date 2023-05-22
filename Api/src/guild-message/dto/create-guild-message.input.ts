import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildMessageInput {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  message_id: number;

  @Field(() => Int)
  channel_id: number;
}
