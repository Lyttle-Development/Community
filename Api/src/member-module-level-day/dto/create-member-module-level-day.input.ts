import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelDayInput {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int, { defaultValue: 0 })
  points_mon: number;

  @Field(() => Int, { defaultValue: 0 })
  points_tue: number;

  @Field(() => Int, { defaultValue: 0 })
  points_wed: number;

  @Field(() => Int, { defaultValue: 0 })
  points_thu: number;

  @Field(() => Int, { defaultValue: 0 })
  points_fri: number;

  @Field(() => Int, { defaultValue: 0 })
  points_sat: number;

  @Field(() => Int, { defaultValue: 0 })
  points_sun: number;
}
