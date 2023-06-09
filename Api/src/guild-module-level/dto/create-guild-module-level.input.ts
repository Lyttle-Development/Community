import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleLevelInput {
  @Field(() => String)
  guildId: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  levelingMultiplier: number;

  @Field(() => String, {
    nullable: true,
  })
  announcementChannelId?: string;

  @Field(() => String, { nullable: true })
  leaderboardChannelId?: string;

  @Field(() => Int, { nullable: true })
  leaderboardLastWeek: number;

  @Field(() => Boolean)
  nicknames: boolean;

  @Field(() => Date)
  lastLeaderboard: Date;
}
