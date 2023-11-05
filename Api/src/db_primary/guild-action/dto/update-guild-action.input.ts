import { CreateGuildActionInput } from './create-guild-action.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildActionInput extends PartialType(
  CreateGuildActionInput,
) {
  @Field(() => Int)
  id: number;
}
