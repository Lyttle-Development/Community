import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleVoiceGrowthInput {
  @Field(() => String)
  channelId: string;

  @Field(() => String)
  guildId: string;

  @Field(() => Boolean, { defaultValue: false })
  enabled: boolean;

  @Field(() => String, { nullable: true })
  preset: string;

  @Field(() => String, { nullable: true })
  prefix: string;

  @Field(() => Boolean, { defaultValue: false })
  manual: boolean;
}
