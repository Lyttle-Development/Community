import { CreateGuildModuleCountToNumberInput } from './create-guild-module-count-to-number.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleCountToNumberInput extends PartialType(
  CreateGuildModuleCountToNumberInput,
) {
  @Field(() => Int)
  id: number;
}
