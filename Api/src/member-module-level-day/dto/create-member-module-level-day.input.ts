import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelDayInput {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int, { defaultValue: 0 })
  points_monday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_tuesday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_wednesday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_thursday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_friday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_saturday: number;

  @Field(() => Int, { defaultValue: 0 })
  points_sunday: number;
}
