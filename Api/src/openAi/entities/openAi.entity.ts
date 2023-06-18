import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OpenAi {
  @Field(() => String, { nullable: true })
  guildId: string | null;
}
