import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleVoiceGrowthChildInput {
  @Field(() => String)
  channelId: string;

  @Field(() => String)
  guildId: string;

  @Field(() => String)
  name: string;
}
