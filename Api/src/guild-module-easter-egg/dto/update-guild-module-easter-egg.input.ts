import { CreateGuildModuleEasterEggInput } from './create-guild-module-easter-egg.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleEasterEggInput extends PartialType(
  CreateGuildModuleEasterEggInput,
) {
  @Field(() => Int)
  id: number;
}
