import { CreateGuildMessageInput } from './create-guild-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildMessageInput extends PartialType(CreateGuildMessageInput) {
  @Field(() => Int)
  id: number;
}
