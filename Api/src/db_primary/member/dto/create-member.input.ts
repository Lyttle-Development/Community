import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Int, { nullable: true })
  birthday: number;

  @Field(() => String, { nullable: true })
  nickname: string;
}
