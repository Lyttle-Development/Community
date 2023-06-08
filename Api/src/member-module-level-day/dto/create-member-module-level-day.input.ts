import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelDayInput {
  @Field(() => Int)
  guildId: string;

  @Field(() => Int)
  userId: string;

  @Field(() => Int, { defaultValue: 0 })
  pointsMonday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsTuesday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsWednesday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsThursday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsFriday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsSaturday: number;

  @Field(() => Int, { defaultValue: 0 })
  pointsSunday: number;
}
