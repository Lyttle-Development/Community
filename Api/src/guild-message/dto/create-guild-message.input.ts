import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildMessageInput {
  @Field(() => Int)
  guildId: string;

  @Field(() => Int)
  messageId: string;

  @Field(() => Int)
  channelId: string;
}
