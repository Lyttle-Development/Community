import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelInput {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int, { defaultValue: 0 })
  spam_check: number;

  @Field(() => Int, { defaultValue: 0 })
  cooldown_count: number;

  @Field(() => Date, { defaultValue: new Date() })
  cooldown_time: Date;

  @Field(() => Date, { defaultValue: new Date() })
  call_start: Date;
  
  @Field(() => Int, { defaultValue: 0 })
  points: number;
}
