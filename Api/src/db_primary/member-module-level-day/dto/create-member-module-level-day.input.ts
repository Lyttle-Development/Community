import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelDayInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
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
