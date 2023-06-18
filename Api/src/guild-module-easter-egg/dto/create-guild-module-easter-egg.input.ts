import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleEasterEggInput {
  @Field(() => String)
  guildId: string;

  @Field(() => Boolean)
  enabled: boolean;
}
