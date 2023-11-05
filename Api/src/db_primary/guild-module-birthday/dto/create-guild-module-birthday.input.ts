import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleBirthdayInput {
  @Field(() => String)
  guildId: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => String, { nullable: true })
  birthdayChannelId: string;
}
