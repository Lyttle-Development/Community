import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleLevelInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  leveling_multiplier: number;

  @Field(() => Int, {
    nullable: true,
  })
  announcement_channel_id?: number;

  @Field(() => Int, { nullable: true })
  leaderboard_channel_id?: number;

  @Field(() => Int, { nullable: true })
  leaderboard_last_week: number;

  @Field(() => Boolean)
  nicknames: boolean;

  @Field(() => Date)
  last_leaderboard: Date;
}
