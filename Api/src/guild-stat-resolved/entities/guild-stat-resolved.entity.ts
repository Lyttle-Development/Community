import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GuildStatResolved {
  @Field(() => String, { nullable: true })
  guildId: string | null;
}
