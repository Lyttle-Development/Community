import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleLevelInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  levelingMultiplier: number;

  @Field(() => Int, {
    nullable: true,
  })
  announcementChannelId?: number;

  @Field(() => Int, { nullable: true })
  leaderboardChannelId?: number;

  @Field(() => Int, { nullable: true })
  leaderboardLastWeek: number;

  @Field(() => Boolean)
  nicknames: boolean;

  @Field(() => Date)
  lastLeaderboard: Date;
}
