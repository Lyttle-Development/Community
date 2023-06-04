import { CreateGuildModuleLevelInput } from './create-guild-module-level.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleLevelInput extends PartialType(
  CreateGuildModuleLevelInput,
) {
  @Field(() => Int)
  id: number;
}
