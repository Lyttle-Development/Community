import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Migrate {
  @Field(() => Boolean, { nullable: true })
  success: boolean;

  @Field(() => String, { nullable: true })
  guildId: string | null;

  @Field(() => Number, { nullable: true })
  users: number;
}
