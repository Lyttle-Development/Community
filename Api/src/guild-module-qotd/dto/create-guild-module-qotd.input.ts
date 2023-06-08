import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleQotdInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  channelId: string;

  @Field(() => Int)
  messageId: string;

  @Field(() => Boolean)
  nicknames: boolean;
}
