import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Discord {
  @Field(() => String, { nullable: true })
  guildId: string | null;
}
