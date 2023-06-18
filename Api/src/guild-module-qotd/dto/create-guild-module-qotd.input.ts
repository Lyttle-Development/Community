import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleQotdInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => String)
  channelId: string;

  @Field(() => String)
  messageId: string;

  @Field(() => Boolean)
  nicknames: boolean;
}
