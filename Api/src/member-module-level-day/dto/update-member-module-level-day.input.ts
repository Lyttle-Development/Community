import { CreateMemberModuleLevelDayInput } from './create-member-module-level-day.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberModuleLevelDayInput extends PartialType(
  CreateMemberModuleLevelDayInput,
) {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  user_id: number;
}
