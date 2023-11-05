import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildMessageInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  messageId: string;

  @Field(() => String)
  channelId: string;
}
