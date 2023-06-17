import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildMessageInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
  messageId: string;

  @Field(() => String)
  channelId: string;
}
