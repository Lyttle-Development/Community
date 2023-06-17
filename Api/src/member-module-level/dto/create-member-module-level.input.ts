import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Int, { defaultValue: 0 })
  spamCheck: number;

  @Field(() => Int, { defaultValue: 0 })
  cooldownCount: number;

  @Field(() => Date, { defaultValue: new Date() })
  cooldownTime: Date;

  @Field(() => Date, { defaultValue: new Date() })
  callStart: Date;

  @Field(() => Int, { defaultValue: 0 })
  points: number;
}
