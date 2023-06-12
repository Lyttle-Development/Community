import { CreateGuildModuleBirthdayInput } from './create-guild-module-birthday.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleBirthdayInput extends PartialType(
  CreateGuildModuleBirthdayInput,
) {
  @Field(() => Int)
  id: number;
}
