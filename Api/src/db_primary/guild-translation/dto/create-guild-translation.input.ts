import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildTranslationInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
