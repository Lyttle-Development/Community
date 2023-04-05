import { CreateGuildModuleQotdInput } from './create-guild-module-qotd.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleQotdInput extends PartialType(CreateGuildModuleQotdInput) {
  @Field(() => Int)
  id: number;
}
