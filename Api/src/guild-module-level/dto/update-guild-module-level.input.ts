import { CreateGuildModuleLevelInput } from './create-guild-module-level.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleLevelInput extends PartialType(
  CreateGuildModuleLevelInput,
) {
  @Field(() => Int)
  id: number;

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
