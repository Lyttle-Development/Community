import { CreateMemberModuleLevelInput } from './create-member-module-level.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberModuleLevelInput extends PartialType(CreateMemberModuleLevelInput) {
  @Field(() => Int)
  id: number;
}
