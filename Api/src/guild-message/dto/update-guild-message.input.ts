import { CreateGuildMessageInput } from './create-guild-message.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildMessageInput extends PartialType(
  CreateGuildMessageInput,
) {
  @Field(() => Int)
  id: string;
}
