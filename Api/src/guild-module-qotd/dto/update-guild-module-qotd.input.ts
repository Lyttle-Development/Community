import { CreateGuildModuleQotdInput } from './create-guild-module-qotd.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleQotdInput extends PartialType(
  CreateGuildModuleQotdInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  channel_id: number;

  @Field(() => Int)
  message_id: number;

  @Field(() => Boolean)
  nicknames: boolean;
}
