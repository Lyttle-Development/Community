import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleVoiceGrowthInput {
  @Field(() => Int)
  channel_id: number;

  @Field(() => Boolean, { defaultValue: false })
  enabled: boolean;

  @Field(() => String, { nullable: true })
  preset: string;

  @Field(() => String, { nullable: true })
  prefix: string;

  @Field(() => Boolean, { defaultValue: false })
  manual: boolean;
}
