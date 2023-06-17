import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => Int)
  guildId: string;

  @Field(() => Int)
  userId: string;

  @Field(() => Int, { nullable: true })
  birthday: number;

  @Field(() => String, { nullable: true })
  nickname: string;
}
