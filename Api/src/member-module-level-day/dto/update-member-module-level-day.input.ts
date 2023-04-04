import { CreateMemberModuleLevelDayInput } from './create-member-module-level-day.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberModuleLevelDayInput extends PartialType(CreateMemberModuleLevelDayInput) {
  @Field(() => Int)
  id: number;
}
